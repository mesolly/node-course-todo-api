const expect = require('expect') ;
const request = require('supertest') ;

var {app} =require('./../server') ;
var {Todo} =require('./../models/todo') ;

var todo = [ {
    text : '1st todo'
},{
    text : '2nd todo'
}];

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todo) ;
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
        .end(done)
    });
});