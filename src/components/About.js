import React from 'react'
import { useEffect, useRef } from 'react'
import storeImg from '../images/store.webp'
import displacement from '../images/diss.png'
import { motion } from "framer-motion"
import * as THREE from 'three'


const About = () => {

    const Threecontainer = useRef()

    //THREE JS SCENE
    useEffect(()=> {
        class Sketch{
            constructor(){
                this.time = 0;
                this.container = Threecontainer.current;
                this.scene = new THREE.Scene();

                this.width = this.container.offsetWidth;
                this.height = this.container.offsetHeight;

                this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
                this.camera.position.z = 1;

                this.renderer = new THREE.WebGLRenderer( { antialias: true } );

                this.container.appendChild( this.renderer.domElement );
                this.mouse = new THREE.Vector2();

                this.resize();
                this.setupResize();
                this.addObjects();
                this.mouseMovement();
                this.render();     
            }

            mouseMovement(){
                window.addEventListener( 'mousemove', (event)=> {
                    this.mouse.x = ( event.clientX / this.width ) * 2 - 1;
                    this.mouse.y = - ( event.clientY / this.height ) * 2 + 1;

                }, false );
            }

            setupResize(){
                window.addEventListener('resize', this.resize.bind(this));
            }

            resize(){
                this.width = this.container.offsetWidth;
                this.height = this.container.offsetHeight;
                this.renderer.setSize( this.width, this.height );
                this.camera.aspect = this.width/this.height;
                this.camera.updateProjectionMatrix();
            }

            addObjects(){
                this.geometry = new THREE.PlaneBufferGeometry(2, 1.6);
                this.material = new THREE.MeshNormalMaterial();

                this.material = new THREE.ShaderMaterial({
                    uniforms:{
                        time: {type: "f", value: 0},
                        progress: {type: "f", value: 0},
                        mouse: {type: "v3", value: new THREE.Vector3()},
                        hover: { value: new THREE.Vector2(0.5, 0.5)},
                        hoverState: { value: 0 },
                        oceanTexture: {type: "t", value: new THREE.TextureLoader().load(storeImg)},
                        displacement: {type: "t", value: new THREE.TextureLoader().load(displacement)},
                        resolution: { type: "v4", value: new THREE.Vector4()},
                        uvRate1: { value: new THREE.Vector2(1, 1)}
                    },
                    fragmentShader: `
                        uniform sampler2D oceanTexture;
                        uniform sampler2D displacement;
                        varying vec2 vUv;
                        varying float vNoise;
                        uniform float time;

                        varying vec3 vPosition;
                        uniform vec3 mouse;


                        float map(float value, float min1, float max1, float min2, float max2) {
                        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
                        }

                        void main(){

                            vec2 newUV = vUv;
                            newUV = vec2(newUV.x, newUV.y + 0.009*sin(newUV.x*10. + time));
                            vec4 displace = texture2D(displacement, vUv.yx );

                            vec2 direction = normalize(vPosition.xy - mouse.xy);

                            float dist = distance(vPosition,mouse);

                            float prox = 1. - map(dist, 0., 0.3, 0., 1.);
                            prox = clamp(prox, 0., 1.);

                            vec2 zoomedUV = vUv + direction * prox * 0.02;

                            vec2 zoomedUV1 = mix(vUv, mouse.xy + vec2(0.5), prox * 0.2);
                            vec4 color = texture2D(oceanTexture, zoomedUV1);
                            gl_FragColor = color;
                        }
                    `,
                    vertexShader: `
                        varying vec2 vUv;
                        uniform float time;
                        uniform vec2 hover;
                        varying float noise;
                        varying float vNoise;
                        varying vec3 vPosition;

                        //	Classic Perlin 3D Noise 
                        //	by Stefan Gustavson
                        //
                        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
                        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
                        vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

                        float cnoise(vec3 P){
                        vec3 Pi0 = floor(P); // Integer part for indexing
                        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
                        Pi0 = mod(Pi0, 289.0);
                        Pi1 = mod(Pi1, 289.0);
                        vec3 Pf0 = fract(P); // Fractional part for interpolation
                        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
                        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                        vec4 iy = vec4(Pi0.yy, Pi1.yy);
                        vec4 iz0 = Pi0.zzzz;
                        vec4 iz1 = Pi1.zzzz;

                        vec4 ixy = permute(permute(ix) + iy);
                        vec4 ixy0 = permute(ixy + iz0);
                        vec4 ixy1 = permute(ixy + iz1);

                        vec4 gx0 = ixy0 / 7.0;
                        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
                        gx0 = fract(gx0);
                        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                        vec4 sz0 = step(gz0, vec4(0.0));
                        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                        vec4 gx1 = ixy1 / 7.0;
                        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
                        gx1 = fract(gx1);
                        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                        vec4 sz1 = step(gz1, vec4(0.0));
                        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                        g000 *= norm0.x;
                        g010 *= norm0.y;
                        g100 *= norm0.z;
                        g110 *= norm0.w;
                        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                        g001 *= norm1.x;
                        g011 *= norm1.y;
                        g101 *= norm1.z;
                        g111 *= norm1.w;

                        float n000 = dot(g000, Pf0);
                        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                        float n111 = dot(g111, Pf1);

                        vec3 fade_xyz = fade(Pf0);
                        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
                        return 2.2 * n_xyz;
                        }


                        void main(){
                            vec3 newposition = position;
                            float PI = 3.1415925;

                            float noise = cnoise(3.*vec3(position.x, position.y, position.z + time/80.));

                            //newposition.z += 0.05*sin((newposition.x + 0.25 + time/20.)*2.*PI);
                            newposition.z += 0.3*cnoise(vec3(position.x*1.,position.y*1. + time/25.,0.));
                            //newposition.z += 0.2*noise;

                            //float dist = distance(uv,hover);

                            // /newposition.z += 1.*sin(dist*30. + time);

                            //vNoise = sin(dist*60. - time);

                            vUv = uv;

                            vPosition = position;

                            gl_Position = projectionMatrix * modelViewMatrix * vec4( newposition, 1.0);
                        }
                    `,
                });


                this.mesh = new THREE.Mesh( this.geometry, this.material );
                this.scene.add( this.mesh );
            }

            render() {
                this.time+=0.05;
                //uniforms time value updating
                this.material.uniforms.time.value = this.time;
                this.renderer.render( this.scene, this.camera );
                window.requestAnimationFrame(this.render.bind(this));
            }
        }

        new Sketch()
    })

    //MOBILE 100VH
    useEffect(()=> {
        let vh = window.innerHeight * 0.01;
        //we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })

    useEffect(()=> {
        window.addEventListener('resize', () => {
        //execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    })


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="about-page">
                <div className="about-page__text">
                    <p>9 Fifty is deeply rooted in street culture with a luxury aesthetic. We grew to embody culture, and play an integral part in its constant regeneration. Skaters, punks, hip-hop heads and the young counter culture at large. 9 Fifty established itself as a brand known for its quality, style, and authenticity, made for artists, photographers, designers, musicians, filmmakers, and writers who defied conventions and contributed to its unique identity and attitude.</p>
                </div>
                <div ref={Threecontainer} className="container"></div>
            </div>
        </motion.div>
    )
}

export default About

