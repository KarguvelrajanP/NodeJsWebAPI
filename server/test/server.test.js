// Calling the library files
const expect = require('expect');
const request = require('supertest');

// Calling the local file system
const { app } = require('../server');
const { user } = require('../models/user');

// Removing the data from database before testing
beforeEach((done) => {
    user.remove({}).then(() => done());
})

describe('POST /employee', () => {

    /// Postive flow 
    it('Should be create new employee', (done) => {
        // Input for employee tables
        var { userName, email } = {
            userName: 'Karguvelrajan',
            email: 'Karguvelrajan.P@gmail.com'
        }
        // creating post request to insert record in employee collection
        request(app)
            .post('/user')
            .send({ userName, email })
            .expect(200)  // expect result should be 200
            .expect((res) => {
                expect(res.body.userName).toBe(userName);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                user.find().then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].userName).toBe(userName);
                    done();
                }).catch((e) => { done(e) });
            })
    })

    // Nagative flow 
    it('should not create record in employee collection with invaild boday data', (done) => {
        request(app)
            .post('/user')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                user.find().then((users) => {
                    expect(users.length).toBe(0);
                    done();
                }).catch((e) => { done(e) });
            })
    });
})
