// Calling the library files
const expect = require('expect');
const request = require('supertest');

// Calling the local file system
const { app } = require('../server');
const { user } = require('../models/user');

// Creating object collecton for user 

const users = [
    { userName: 'user1', email: 'user1@gmail.com' },
    { userName: 'user2', email: 'user2@gmail.com' }
]


// Removing the data from database before testing
beforeEach((done) => {
    user.remove({}).then(() => {
        return user.insertMany(users);
    }).then(() => done()).catch((e) => {
        done(e);
    });
})


// Testing script for insert new record into employee collection
describe('POST /employee', () => {

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