<template>
  <div class="boot">
    <canvas ref='canvas'></canvas>
  </div>
</template>

<script>
import * as Three from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

export default {
  data () {
    return {
      renderer: null,
      scene: null,
      camera: null,
      geometry: null,
      fog: null
    }
  },

  mounted () {
    this.renderer = new Three.WebGLRenderer({ canvas: this.$refs.canvas })
    this.scene = new Three.Scene()
    this.scene.background = new Three.Color('white')
    this.createCamera()
    this.createLight()
    // this.createFog()
    this.createGUI()
    this.createPlane()
    this.createCube()
    this.createShpere()

    requestAnimationFrame(this.render.bind(this))
  },

  methods: {
    createCamera () {
      const fov = 40
      const aspect = 2
      const near = 0.1
      const far = 100

      const camera = this.camera = new Three.PerspectiveCamera(fov, aspect, near, far)
      camera.position.set(0, 10, 20)
      camera.lookAt(0, 5, 0)
    },

    createLight () {
      const color = 0xFFFFFF
      const indensity = 1
      const light = new Three.DirectionalLight(color, indensity)
      light.position.set(0, 20, 5)
      light.target.position.set(-5, 0, 0)

      this.scene.add(light)
      this.scene.add(light.target)
    },

    createFog () {
      const hex = 0xFFFFFF
      const density = 0.3
      const fog = new Three.FogExp2(hex, density)

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
      plane.rotation.x = Math.PI * -0.5

      this.scene.add(plane)
    },

    createShpere () {
      const sphereRadius = 3
      const sphereWidthDevisions = 32
      const sphereHeightDevisions = 16
      const sphereGeo = new Three.SphereBufferGeometry(sphereRadius, sphereWidthDevisions, sphereHeightDevisions)
      const sphereMaterial = new Three.MeshPhongMaterial({ color: '#ca8' })
      const sphereMesh = new Three.Mesh(sphereGeo, sphereMaterial)
      sphereMesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0)

      this.scene.add(sphereMesh)
    },

    createCube () {
      const cubeSize = 4
      this.geometry = new Three.BoxBufferGeometry(cubeSize, cubeSize, cubeSize)
      const material = new Three.MeshPhongMaterial({ color: 0x55aaff })
      const mesh = new Three.Mesh(this.geometry, material)

      mesh.position.x = cubeSize + 1
      mesh.position.y = cubeSize / 2

      this.scene.add(mesh)
    },

    createGUI () {
      // class FogColorHelper {
      //   constructor (scene, fog) {
      //     this.scene = scene
      //     this.fog = fog
      //     this.color = '#fff'
      //   }

      //   get value () {
      //     return this.color
      //   }

      //   set value (v) {
      //     const color = new Three.Color(v)

      //     this.fog.color = color
      //     this.scene.background = color
      //     this.color = v
      //   }
      // }

      const gui = new GUI()

      // gui.addColor(new FogColorHelper(this.scene, this.fog), 'value')
      // gui.add(this.fog, 'density', 0, 1, 0.01)
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

    render () {
      const canvas = this.$refs.canvas
      const pixelRatio = window.devicePixelRatio
      const width = canvas.clientWidth * pixelRatio | 0
      const height = canvas.clientHeight * pixelRatio | 0

      this.renderer.setSize(width, height, false)
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render.bind(this))
    }
  }
}
</script>

<style scoped>
.boot {
  width: 100%;
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
