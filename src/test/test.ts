import chai from 'chai'
import Container from 'typedi'
import Auth from '../auth/Auth'
import "reflect-metadata"; // for typedi

chai.should()

describe('generate token' , () => {

    const auth = Container.get(Auth)

    it('test jwt token generate', () => {
        auth.generateToken('kgh').should.to.be.a('string')
    }) 
})
