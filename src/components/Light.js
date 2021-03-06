import { ComponentManager } from '../core/ComponentManager.js';
import { AmbientLight, DirectionalLight, HemisphereLight, PointLight, SpotLight } from '../lib/three.module.js';

class Light {

	init( data ) {

		this.type = data.type;
		const color = data.color;
		const intensity = data.intensity;

		switch ( this.type ) {

			case 'ambient':
				this.ref = new AmbientLight( color, intensity );
				break;
			case 'directional':
				this.ref = new DirectionalLight( color, intensity );
				this.ref.position.set( 0, 0, 0 );
				break;
			case 'hemisphere':
				this.ref = new HemisphereLight( data.skyColor, data.groundColor, intensity );
				this.ref.position.set( 0, 0, 0 );
				break;
			case 'point':
				this.ref = new PointLight( color, intensity, data.distance, data.decay );
				break;
			case 'spot':
				this.ref = new SpotLight( color, intensity, data.distance, data.angle, data.penumbra, data.decay );
				this.ref.position.set( 0, 0, 0 );
				break;
			default:
				console.error( 'Light: invalid light type ' + this.type );

		}

		this.addEventListener( 'enable', this.onEnable );
		this.addEventListener( 'disable', this.onDisable );

	}

	onEnable() {

		this.entity.add( this.ref );

	}

	onDisable() {

		this.entity.remove( this.ref );

	}

}

Light.config = {
	schema: {
		type: { type: 'select', default: 'ambient', select: [ 'ambient', 'directional', 'hemisphere', 'point', 'spot' ] },
		color: { type: 'color', if: { type: [ 'ambient', 'directional', 'point', 'spot' ] } },
		intensity: { default: 1 },
		skyColor: { type: 'color', if: { type: [ 'hemisphere' ] } },
		groundColor: { type: 'color', if: { type: [ 'hemisphere' ] } },
		distance: { default: 0, if: { type: [ 'point', 'spot' ] } },
		decay: { default: 1, if: { type: [ 'point', 'spot' ] } },
		angle: { default: Math.PI / 3, angle: 'deg', if: { type: [ 'spot' ] } },
		penumbra: { default: 0, if: { type: [ 'spot' ] } }
	}
};

ComponentManager.registerComponent( 'light', Light );
