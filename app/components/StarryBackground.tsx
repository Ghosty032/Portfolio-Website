"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function StarryBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        camera.position.z = 5

        // Create circular texture for stars
        const createCircleTexture = () => {
            const canvas = document.createElement('canvas')
            canvas.width = 64
            canvas.height = 64
            const ctx = canvas.getContext('2d')!

            const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
            gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)')
            gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)')
            gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)')
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, 64, 64)

            return new THREE.CanvasTexture(canvas)
        }

        // Create stars
        const starsGeometry = new THREE.BufferGeometry()
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            map: createCircleTexture(),
            transparent: true,
            opacity: 1,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        })

        // Generate random star positions
        const starsVertices = []
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 2000
            const y = (Math.random() - 0.5) * 2000
            const z = (Math.random() - 0.5) * 2000
            starsVertices.push(x, y, z)
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
        const stars = new THREE.Points(starsGeometry, starsMaterial)
        scene.add(stars)

        // Animation
        const animate = () => {
            requestAnimationFrame(animate)
            stars.rotation.y += 0.0002
            stars.rotation.x += 0.0001
            renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
            starsGeometry.dispose()
            starsMaterial.dispose()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ background: 'black' }}
        />
    )
}
