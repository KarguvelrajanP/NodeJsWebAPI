//process.env.MONGODB_URI = 'mongodb://localhost:27017/APIDbTest'
// Calling the library files
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
// Calling the local file system
const { app } = require('../server');
const { user } = require('../models/user');
// Creating object collecton for user 
const users = [
    { _id: new ObjectID(), userName: 'user1', email: 'user1@gmail.com' },
    { _id: new ObjectID(), userName: 'user2', email: 'user2@gmail.com' }
]
// Removing the data from database before testing
beforeEach((done) => {
    user.remove({}).then(() => {
        return user.insertMany(users);
    }).then(() => done()).catch((e) => {
        done(e);
    });
})
// Testing script for insert new record into user collections.
describe('POST /user', () => {
    /// Postive flow 
    it('Should be create new employee', (done) => {
        // Input for employee tables
        var { userName, email } = {
            userName: 'user3',
            email: 'user3@gmail.com'
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
                user.find({ userName, email }).then((users) => {
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
                    expect(users.length).toBe(2);
                    done();
                }).catch((e) => { done(e) });
            })
    });
})
// Testing script for get the all user list from user collections.
describe('Get / employee', () => {
    // Postive flow to get the all records from employee collections
    it('Should be return all records', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body.users.length).toBe(2);
            })
            .end(done);
    })

});
// Testing script for get the user with id method
describe('Get /user/:id', () => {
    it('Should be return data for corresponding id', (done) => {
        request(app)
            .get(`/user/${users[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.userName).toBe(users[0].userName)
            })
            .end(done);
    })

    it('Should be return 404 for record not found', (done) => {
        request(app)
            .get(`/user/${new ObjectID()}`)
            .expect(404)
            // .expect((res) => {                
            //     expect(res.body.user.userName).toBe(users[0].userName)
            // })
            .end(done);
    })

    it('Should be return 404 for non object ids', (done) => {
        request(app)
            .get(`/user/123`)
            .expect(404)
            // .expect((res) => {
            //     console.log(res.body.user.userName)
            //     expect(res.body.user.userName).toBe(users[0].userName)
            // })
            .end(done);
    })
});
// Testing script to delete the user with id
describe('Delete /user/:id', () => {
    it('Should remove user', (done) => {
        var hexId = users[1]._id.toHexString();
        request(app)
            .delete(`/user/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                user.findById(hexId).then((doc) => {
                    expect(doc).toBe(null);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('Should return 404 if user not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/user/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('Should return 404 if user not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/user/${hexId}`)
            .expect(404)
            .end(done)
    });

});
describe('Patch /user/:id', () => {
    it('Should update the data', (done) => {
        // Getting the ID
        var haxId = users[1]._id.toHexString();
        //    var body = { userName: 'user3', email: 'user3@gmail.com' }
        request(app)
            .patch(`/user/${haxId}`)
            .send({ userName: 'user3', email: 'user3@gmail.com' })
            .expect(200)
            .expect((res) => {
                expect(res.body.userName).toBe('user3');
            })
            .end(done)
    })

    it('Should return status 404 if doc not found', (done) => {
        // Getting the ID
        var haxId = new ObjectID().toHexString();
        request(app)
            .patch(`/user/${haxId}`)
            .send({ userName: 'user3', email: 'user3@gmail.com' })
            .expect(404)
            .end(done)
    })
});