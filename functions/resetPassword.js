const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail');
// var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function(req, res) {
    const email = req.body.email;
    const newPassword = Math.random().toString(36).slice(-10);
    admin.auth().getUserByEmail(email)
    .then(userRecord => {
        admin.auth().updateUser(userRecord.uid, { password: newPassword })
        .then(userRecord => {
            const displayName = userRecord.displayName;
            const uid = userRecord.uid;
            const msg = {
                to: email,
                from: 'gtcs29@gmail.com',
                subject: 'Reset Password',
                text: `Hey ${displayName}! \nYou requested a password Reset. Your temporary password is: ${newPassword} \nYou can use this to signinto your account. Please change your password immediately after Sign in.`,
                html: `<p>Hey ${displayName}!</p> <p>You requested a password Reset. Your temporary password is: ${newPassword}</p> <p>You can use this to sign into your account. Please change your password immediately after Sign in.</p>`,
            };
            sgMail.send(msg)
            .then(() => {
                var db = admin.firestore();
                db.collection('users').doc(uid).collection('auth').doc('reset_password').set({
                    passwordReset: true
                })
                .then(() => {
                    res.send({ success: true });
                })
                .catch((err) => {
                    return res.status(422).send({ error: err});
                })
            })
            .catch((err) => {
                return res.status(422).send({ error: err });
            })
        })
        .catch(err => {
            res.status(422).send({ error: err });
        })
    })
    .catch((err) => {
        return res.status(422).send({ error: err });
    });
};
