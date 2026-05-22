const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DB_URL
    });
}

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const { bid, title } = JSON.parse(event.body);
        const db = admin.database();

        // 1. Approva la scommessa
        const pendingSnap = await db.ref(`pending_bets/${bid}`).get();
        if (!pendingSnap.exists()) return { statusCode: 404, body: "Not found" };
        
        await db.ref(`bets/${bid}`).set({ ...pendingSnap.val(), status: 'open' });
        await db.ref(`pending_bets/${bid}`).remove();

        // 2. Prendi tutti i Token registrati
        const usersSnap = await db.ref('users').get();
        const tokens = [];
        if (usersSnap.exists()) {
            usersSnap.forEach(u => {
                const data = u.val();
                if (data.fcm_tokens) Object.keys(data.fcm_tokens).forEach(t => tokens.push(t));
            });
        }

        // 3. Spara la notifica Push!
        const uniqueTokens = [...new Set(tokens)]; // <-- IL FILTRO MAGICO ANTI-DOPPIONI
        if (uniqueTokens.length > 0) {
            await admin.messaging().sendEachForMulticast({
                notification: {
                    title: '🐗 Nuova Scommessa!',
                    body: `Il Solengo Master ha aperto: "${title}". Corri a puntare!`
                },
                tokens: uniqueTokens // <-- ORA USA SOLO LE TARGHE UNICHE
            });
        }

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
