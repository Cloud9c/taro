import { ComponentManager } from '../core/ComponentManager.js';
import { Mesh, BufferGeometry, BoxBufferGeometry, CircleBufferGeometry, ConeBufferGeometry, CylinderBufferGeometry, DodecahedronBufferGeometry, ExtrudeBufferGeometry, IcosahedronBufferGeometry, LatheBufferGeometry, OctahedronBufferGeometry, ParametricBufferGeometry, PlaneBufferGeometry, PolyhedronBufferGeometry, RingBufferGeometry, ShapeBufferGeometry, SphereBufferGeometry, TetrahedronBufferGeometry, TextBufferGeometry, TorusBufferGeometry, TorusKnotBufferGeometry, TubeBufferGeometry } from '../lib/three.js';

export class Geometry {

	init( data ) {

		const primitive = data.primitive;

		switch ( primitive ) {

			case 'box':
				this.ref = new BoxBufferGeometry( data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments );
				break;
			case 'cricle':
				this.ref = new CircleBufferGeometry( data.radius, data.segments, data.thetaStart, data.thetaLength );
				break;
			case 'cone':
				this.ref = new ConeBufferGeometry( data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength );
				break;
			case 'cylinder':
				this.ref = new CylinderBufferGeometry( data.radiusTop, data.radiusBottom, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength );
				break;
			case 'dodecahedron':
				this.ref = new DodecahedronBufferGeometry( data.radius, data.detail );
				break;
			case 'icosahedron':
				this.ref = new IcosahedronBufferGeometry( data.radius, data.detail );
				break;
			case 'octahedron':
				this.ref = new OctahedronBufferGeometry( data.radius, data.detail );
				break;
			case 'plane':
				this.ref = new PlaneBufferGeometry( data.width, data.height, data.widthSegments, data.heightSegments );
				break;
			case 'ring':
				this.ref = new RingBufferGeometry( data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength );
				break;
			case 'sphere':
				this.ref = new SphereBufferGeometry( data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength );
				break;
			case 'tetrahedron':
				this.ref = new TetrahedronBufferGeometry( data.radius, data.detail );
				break;
			case 'torus':
				this.ref = new TorusBufferGeometry( data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc );
				break;
			case 'torusKnot':
				this.ref = new TorusKnotBufferGeometry( data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q );
				break;
			case 'custom':
				this.ref = new BufferGeometry();
				break;
			default:
				throw new Error( 'Geometry: invalid geometry primitive ' + primitive );

		}

		this.addEventListener( 'enable', this.onEnable );
		this.addEventListener( 'disable', this.onDisable );

	}

	onEnable() {

		const material = this.entity.getComponent( 'material' );
		if ( this.mesh === undefined && material !== undefined && material._enabled ) {

			material.mesh = this.mesh = new Mesh( this.ref, material.ref );
			this.entity.add( this.mesh );

		}

	}

	onDisable() {

		const material = this.entity.getComponent( 'material' );
		if ( material !== undefined && material._enabled ) {

			this.entity.remove( this.mesh );
			delete this.mesh;
			delete material.mesh;

		}

	}

}

ComponentManager.register( 'geometry', Geometry, {
	schema: {
		primitive: { type: 'select', default: 'box', select: [ 'box', 'circle', 'cone', 'cylinder', 'dodecahedron', 'icosahedron', 'octahedron', 'plane', 'ring', 'sphere', 'tetrahedron', 'torus', 'torusKnot', 'custom' ] },

		depth: { default: 1, min: 0, if: { type: [ 'box' ] } },
		height: { default: 1, min: 0, if: { type: [ 'box', 'cone', 'cylinder', 'plane' ] } },
		width: { default: 1, min: 0, if: { type: [ 'box', 'plane' ] } },
		heightSegments: { default: 1, min: 1, max: 20, type: 'int', if: { type: [ 'box', 'plane' ] } },
		widthSegments: { default: 1, min: 1, max: 20, type: 'int', if: { type: [ 'box', 'plane' ] } },
		depthSegments: { default: 1, min: 1, max: 20, type: 'int', if: { type: [ 'box' ] } },

		radius: { default: 1, min: 0, if: { type: [ 'circle', 'cone', 'cylinder', 'dodecahedron', 'icosahedron', 'octahedron', 'sphere', 'tetrahedron', 'torus', 'torusKnot' ] } },
		segments: { default: 32, min: 3, type: 'int', if: { type: [ 'circle' ] } },
		thetaLength: { default: 360, min: 0, if: { type: [ 'circle', 'cone', 'cylinder', 'ring' ] } },
		thetaStart: { default: 0, if: { type: [ 'circle', 'cone', 'cylinder', 'ring', 'sphere' ] } },

		openEnded: { default: false, if: { type: [ 'cone', 'cylinder' ] } },
		heightSegments: { default: 18, min: 1, type: 'int', if: { type: [ 'cone', 'cylinder' ] } },
		radialSegments: { default: 36, min: 3, type: 'int', if: { type: [ 'cone', 'cylinder' ] } },

		detail: { default: 0, min: 0, max: 5, type: 'int', if: { type: [ 'dodecahedron', 'icosahedron', 'octahedron', 'tetrahedron' ] } },

		innerRadius: { default: 0.8, min: 0, if: { type: [ 'ring' ] } },
		outerRadius: { default: 1.2, min: 0, if: { type: [ 'ring' ] } },
		phiSegments: { default: 10, min: 1, type: 'int', if: { type: [ 'ring' ] } },
		thetaSegments: { default: 32, min: 3, type: 'int', if: { type: [ 'ring' ] } },

		phiLength: { default: 360, if: { type: [ 'sphere' ] } },
		phiStart: { default: 0, min: 0, if: { type: [ 'sphere' ] } },
		thetaLength: { default: 180, min: 0, if: { type: [ 'sphere' ] } },
		heightSegments: { default: 18, min: 2, type: 'int', if: { type: [ 'sphere' ] } },
		widthSegments: { default: 36, min: 3, type: 'int', if: { type: [ 'sphere' ] } },

		tube: { default: 0.2, min: 0, if: { type: [ 'torus', 'torusKnot' ] } },
		radialSegments: { default: 36, min: 2, type: 'int', if: { type: [ 'torus' ] } },
		tubularSegments: { default: 32, min: 3, type: 'int', if: { type: [ 'torus' ] } },
		arc: { default: 360, if: { type: [ 'torus' ] } },

		p: { default: 2, min: 1, if: { type: [ 'torusKnot' ] } },
		q: { default: 3, min: 1, if: { type: [ 'torusKnot' ] } },
		radialSegments: { default: 8, min: 3, type: 'int', if: { type: [ 'torusKnot' ] } },
		tubularSegments: { default: 64, min: 3, type: 'int', if: { type: [ 'torusKnot' ] } },
	},
	allowMultiple: false,
} );
