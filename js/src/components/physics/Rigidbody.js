import { OIMO } from "../../physics/oimoPhysics.js";
import { Physics } from "../../core/Physics.js";
import { Vector3, Matrix3, Quaternion } from "../../engine.js";

const quat = new Quaternion();
const vector = new Vector3();
const vector2 = new Vector3();
const config = new OIMO.RigidBodyConfig();

export class Rigidbody {
	start(data) {
		if ("_physicsRef" in this.entity) {
			this._ref = this.entity._physicsRef;
		} else {
			this.entity.matrixWorld.decompose(vector, quat, vector2);
			config.position = vector;
			config.rotation.fromQuat(quat);
			this.entity._physicsRef = this._ref = new OIMO.RigidBody(config);

			this._ref.component = this;
			this._ref.entity = this.entity;
		}

		if ("angularVelocity" in data)
			this.setAngularVelocity(data.angularVelocity);

		if ("angularDamping" in data)
			this._ref.setAngularDamping(data.angularDamping);

		if ("linearVelocity" in data)
			this.setLinearVelocity(data.linearVelocity);

		if ("linearDamping" in data)
			this._ref.setLinearDamping(data.linearDamping);

		this.autoSleep = "autoSleep" in data ? data.autoSleep : true;
		this._ref.mass = "mass" in data ? data.mass : 1;
		this._isKinematic = "isKinematic" in data ? data.isKinematic : false;
		this.setRotationFactor(
			"rotationFactor" in data
				? data.rotationFactor
				: new Vector3(1, 1, 1)
		);

		if ("useGravity" in data && !data.useGravity) {
			this.gravityScale = 0;
		}

		this.addEventListener("enable", this.onEnable);
		this.addEventListener("disable", this.onDisable);
		this.entity.addEventListener("scenechange", this.onSceneChange);
	}

	onEnable() {
		this.mass = this._ref.mass;
		if (this._isKinematic) this._ref.setType(2);
		else {
			this._ref.setType(0);
			this.mass = this._ref._mass;
		}
		if (this._ref.getNumShapes() === 0) {
			this.entity.scene._physicsWorld.addRigidBody(this._ref);
		}
	}

	onDisable() {
		if (this._ref.getNumShapes() > 0) {
			this._ref.setType(1);
		} else {
			this.entity.scene._physicsWorld.removeRigidBody(this._ref);
		}
	}

	onSceneChange(event) {
		// need to test
		if (this.entity.enabled) {
			event.oldScene._physicsWorld.removeRigidBody(this._ref);
			event.newScene._physicsWorld.addRigidBody(this._ref);
		}
	}

	addAngularVelocity(v) {
		this._ref.addAngularVelocity(v);
	}
	addLinearVelocity(v) {
		this._ref.addAngularVelocity(v);
	}
	applyAngularImpulse(v) {
		this._ref.applyAngularImpulse(v);
	}
	applyForce(v, w) {
		this._ref.applyForce(v, w);
	}
	applyForceToCenter(v) {
		this._ref.applyForceToCenter(v);
	}
	applyImpulse(v, w) {
		this._ref.applyImpulse(v, w);
	}
	applyLinearImpulse(v) {
		this._ref.applyLinearImpulse(v);
	}
	applyTorque(v) {
		this._ref.applyTorque(v);
	}
	get angularDamping() {
		return this._ref.getAngularDamping();
	}
	getAngularVelocity() {
		const vector = new Vector3();
		this._ref.getAngularVelocityTo(vector);
		return vector;
	}
	get gravityScale() {
		return this._ref.getGravityScale();
	}
	get linearDamping() {
		return this._ref.getLinearDamping();
	}
	getLinearVelocity() {
		const vector = new Vector3();
		this._ref.getLinearVelocityTo(vector);
		return vector;
	}
	get localInertia() {
		const v = this._ref.getLocalInertia();
		return new Matrix3().set(
			v.e00,
			v.e01,
			v.e02,
			v.e10,
			v.e11,
			v.e12,
			v.e20,
			v.e21,
			v.e22
		);
	}
	get mass() {
		return this._ref._mass;
	}
	get sleepTime() {
		return this._ref.getSleepTime();
	}
	get isKinematic() {
		return this.isKinematic;
	}
	set isKinematic(v) {
		this._isKinematic = v;
		if (v) this._ref.setType(2);
		else {
			this._ref.setType(0);
			this.mass = this._ref._mass;
		}
	}
	get isSleeping() {
		return this._ref.isSleeping();
	}
	set isSleeping(sleep) {
		if (sleep) {
			this._ref.sleep();
		} else {
			this._ref.wakeUp();
		}
	}
	rotate(v) {
		this._ref.rotateXyz(v);
	}
	set angularDamping(v) {
		this._ref.setAngularDamping(v);
	}
	setAngularVelocity(v) {
		this._ref.setAngularVelocity(v);
	}
	get autoSleep() {
		return this._autoSleep;
	}
	set autoSleep(v) {
		this._autoSleep = v;
		this._ref.setAutoSleep(v);
	}
	set gravityScale(v) {
		this._ref.setGravityScale(v);
	}
	set linearDamping(v) {
		this._ref.setLinearDamping(v);
	}
	setLinearVelocity(v) {
		this._ref.setLinearVelocity(v);
	}
	set mass(v) {
		this._ref._mass = v;
		const w = this._ref.getMassData();
		w.mass = v;
		this._ref.setMassData(w);
	}
	getRotationFactor() {
		return this._rotationFactor;
	}
	setRotationFactor(vector) {
		this._rotationFactor = vector;
		this._ref.setRotationFactor(vector);
	}
}
