
import D3 from '@/components/D3'
import * as Three from 'three'

export default {
  extends: D3,

  data () {
    return {
      mesh: null
    }
  },

  methods: {
    init () {
      const geo = new Three.ParametricGeometry(this.tube(2, 8), 20, 20)
      const mat = new Three.MeshPhongMaterial({
        color: 0x55ccff,
        side: Three.DoubleSide
      })
      const mesh = this.mesh = new Three.Mesh(geo, mat)
      this.scene.add(mesh)
    },

    tube (r, h) {
      return function (u, v, target) {
        u *= Math.PI * 2

        const x = Math.sin(u) * r
        const y = h * (v - 0.5)
        const z = Math.cos(u) * r

        target.set(x, y, z)
      }
    },

    beforeRender (time) {
      time /= 1000

      this.mesh.rotation.x = time
      this.mesh.rotation.z = time
    }
  }
}
