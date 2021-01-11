import { Collider } from './Collider.js';
import { ConvexHull } from '../../../physics/ConvexHull.js';
import { OIMO } from '../../../lib/oimo.js';

const convexHull = new ConvexHull();

export class MeshCollider extends Collider {

	start( data ) {

		data.type = 'mesh';
		super.start( data );

	}

	_addDerivedProperties( data ) {

		this._mesh = data.mesh;
		this._points = data.points;

	}

	_setGeometry( scale, max ) {

		if ( this._points === undefined && this._mesh !== undefined ) {

			this._points = convexHull.setFromObject( this._mesh ).vertices;
			for ( let i = 0, len = this._points.length; i < len; i ++ ) {

				this._points[ i ] = this._points[ i ].point.multiply( scale );

			}

		} else {

			throw 'MeshCollider: points or mesh must be provided';

		}

		return new OIMO.ConvexHullGeometry( this._points );

	}

}