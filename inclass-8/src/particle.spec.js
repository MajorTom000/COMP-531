import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'


describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0,{width: 800, height: 400})
        expect(position[0]).to.be.closeTo(1.5,0.1)
        expect(position[1]).to.be.closeTo(0.5,0.1)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0,{width: 800, height: 400}) // dt is different here
        expect(position[0]).to.be.closeTo(2.0,0.1)
        expect(position[1]).to.be.closeTo(0.0,0.1)
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle({position: [1,1], velocity:[0,0], acceleration:[1,1]})
        const {velocity} = update(p, 1.0,{width: 800, height: 400})
        expect(velocity[0]).to.be.closeTo(1.0,0.1)
        expect(velocity[1]).to.be.closeTo(1.0,0.1)
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        var test1 = function(){
            const p = particle({position:[0,200], velocity:[-1,0]})
            const {position} = update(p,1.0,{width:800,height:400})
            expect(position[0]).to.be.closeTo(800,0.1)
            expect(position[1]).to.be.closeTo(200,0.1)
        }
       
        var test2 = function(){
            const p = particle({position:[800,200], velocity:[1,0]})
            const {position} = update(p,1.0,{width:800,height:400})
            expect(position[0]).to.be.closeTo(0,0.1)
            expect(position[1]).to.be.closeTo(200,0.1)
        }

        var test3 = function(){
            const p = particle({position:[400,0], velocity:[0,-1]})
            const {position} = update(p,1.0,{width:800,height:400})
            expect(position[0]).to.be.closeTo(400,0.1)
            expect(position[1]).to.be.closeTo(400,0.1)
        }

        var test4 = function(){
            const p = particle({position:[400,400], velocity:[0,1]})
            const {position} = update(p,1.0,{width:800,height:400})
            expect(position[0]).to.be.closeTo(400,0.1)
            expect(position[1]).to.be.closeTo(0,0.1)
        }

        test1()
        test2()
        test3()
        test4()


    })

})
