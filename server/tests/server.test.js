const expect = require('expect') ;
const request = require('supertest') ;
const {ObjectID} = require('mongodb') ;

const {app} =require('./../server') ;
const {Todo} =require('./../models/todo') ;

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo'
  }];

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todos) ;
    }).then(()=> done()) ;
});

describe('Post /todos' ,()=>{

    it('Should create new todo',(done)=>{
        var text = 'Hello mocha' ;

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text) ;
        })
        .end((err,res)=>{
            if(err){
                return done(err) ;
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e) );
        });

    });

    it('Should not create new todo with bad data',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err) ;
            }

            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done() ;
            }).catch((e)=>done(e));
        })

    });
});

describe('GET /todos',()=>{
    it('Should display all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id',()=>{
    /*it('should return todo doc', (done) => {
        request(app)
          .get(`/todos/${todos[0]._id.toHexString()}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
          })
          .end(done);
    });*/
    it('Should return 404 if todo not found',(done)=>{
        var id = new ObjectID().toHexString() ;

        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
    it('Should return 400 if object id invalid',(done)=>{
        request(app)
        .get('/todos/123')
        .expect(400)
        .end(done) ;
    });
});

describe('DELETE /todos/:id',()=>{
    /*it('Should delete todo',(done)=>{
        var id = todos[1]._id.toHexString() ;
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.todo._id).toBe(id) ;
        })
        .end((err,res)=>{
            if(err){
                return done(err) ;
            }
            Todo.findById(id).then((todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch((err) => done(err));
        });

    });*/
    it('Should return 404 if todo not found',(done)=>{
        var id = new ObjectID().toHexString() ;

        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
    it('Should return 400 if object id invalid',(done)=>{
        request(app)
        .delete('/todos/123')
        .expect(400)
        .end(done) ;
    });
});