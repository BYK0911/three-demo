
import * as Three from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import D3 from '@/components/D3.vue'

export default {
  extends: D3,

  data () {
    return {
      sphere: null,
      fog: null
    }
  },

  methods: {
    init () {
      this.scene.background = new Three.Color('white')
      this.createFog()
      this.createGUI()
      this.createPlane()
      this.createCube()
      this.createShpere()
    },

    createFog () {
      const hex = 0xFFFFFF
      const near = 2
      const far = 100
      const fog = new Three.Fog(hex, near, far)

      this.fog = this.scene.fog = fog
    },

    createPlane () {
      const planeSize = 40
      const textureLoader = new Three.TextureLoader()
      const texture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png')
      texture.wrapS = Three.RepeatWrapping
      texture.wrapT = Three.RepeatWrapping
      texture.magFilter = Three.NearestFilter
      const repeats = planeSize / 2
      texture.repeat.set(repeats, repeats)
      const material = new Three.MeshPhongMaterial({ map: texture, side: Three.DoubleSide })
      const geometry = new Three.PlaneBufferGeometry(planeSize, planeSize)
      const plane = new Three.Mesh(geometry, material)
      plane.receiveShadow = true
      plane.rotation.x = Math.PI * -0.5

      this.scene.add(plane)
    },

    createShpere () {
      const sphereRadius = 3
      const sphereWidthDevisions = 32
      const sphereHeightDevisions = 16
      const sphereGeo = new Three.SphereBufferGeometry(sphereRadius, sphereWidthDevisions, sphereHeightDevisions)
      const sphereMaterial = new Three.MeshPhongMaterial({ color: '#ca8' })
      const sphereMesh = this.sphere = new Three.Mesh(sphereGeo, sphereMaterial)
      sphereMesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0)
      sphereMesh.castShadow = true
      sphereMesh.receiveShadow = true

      this.scene.add(sphereMesh)
    },

    createCube () {
      const cubeSize = 4
      this.geometry = new Three.BoxBufferGeometry(cubeSize, cubeSize, cubeSize)
      const material = new Three.MeshPhongMaterial({ color: 0x55aaff })
      const mesh = new Three.Mesh(this.geometry, material)

      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.position.x = cubeSize + 1
      mesh.position.y = cubeSize / 2

      this.scene.add(mesh)
    },

    createGUI () {
      class FogColorHelper {
        constructor (scene, fog) {
          this.scene = scene
          this.fog = fog
          this.color = '#fff'
        }

        get value () {
          return this.color
        }

        set value (v) {
          const color = new Three.Color(v)

          this.fog.color = color
          this.scene.background = color
          this.color = v
        }
      }

      const gui = new GUI()

      gui.addColor(new FogColorHelper(this.scene, this.fog), 'value')
      gui.add(this.fog, 'near', 0, 10, 0.1)
      gui.add(this.fog, 'far', 10, 100, 1)
      gui.add(this.camera.position, 'x', -50, 50, 1).onChange(() => {
        this.camera.lookAt(0, 0, 0)
        this.camera.updateProjectionMatrix()
      })
      gui.add(this.camera.position, 'y', -50, 50, 1).onChange(() => {
        this.camera.lookAt(0, 0, 0)
        this.camera.updateProjectionMatrix()
      })
      gui.add(this.camera.position, 'z', 0, 50, 1).onChange(() => {
        this.camera.lookAt(0, 0, 0)
        this.camera.updateProjectionMatrix()
      })
    },

    beforeRender (time) {
      this.sphere.position.y = Math.abs(Math.sin(time / 500)) * 2 + 3
    }
  }
}
