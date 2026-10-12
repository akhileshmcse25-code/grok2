import { i as __toESM } from "../_runtime.mjs";
import { a as useFrame, c as require_jsx_runtime, i as Canvas, l as require_react, n as Environment, o as useThree, r as useGLTF, t as Lightformer } from "../_libs/@react-three/drei+[...].mjs";
import { a as ScrollText, c as Gift, i as Ticket, l as Award, n as Trophy, o as Megaphone, s as Handshake, t as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMAW8ptm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ASTRONAUT = {
	scale: 1,
	positionY: -2.5,
	startX: 3,
	endX: -3,
	cameraZ: 6,
	cameraY: .5,
	fov: 50,
	initialRotationY: .2 * Math.PI,
	initialRotationX: .1,
	rotationMultiplierY: 2 * Math.PI,
	rotationMultiplierX: .3,
	floatAmplitude: .1,
	floatSpeed: .8,
	ambientIntensity: .6,
	mainLightIntensity: 1.5,
	rimLightIntensity: .8,
	scrub: .35
};
var LIGHTS = {
	key: "#ffffff",
	rim: "#8b5cf6",
	pink: "#ec4899",
	cyan: "#06b6d4"
};
var MODEL_URL = "/models/astronaut.glb";
var StageError = class extends import_react.Component {
	state = { message: null };
	static getDerivedStateFromError() {
		return { message: "model" };
	}
	render() {
		if (this.state.message) return null;
		return this.props.children;
	}
};
function readScrollProgress() {
	const max = document.documentElement.scrollHeight - window.innerHeight;
	return max > 0 ? window.scrollY / max : 0;
}
function Suit() {
	const { scene: original } = useGLTF(MODEL_URL);
	const scene = (0, import_react.useMemo)(() => original.clone(true), [original]);
	const group = (0, import_react.useRef)(null);
	const target = (0, import_react.useRef)(0);
	const smooth = (0, import_react.useRef)(0);
	const reduce = (0, import_react.useRef)(false);
	const { size } = useThree();
	(0, import_react.useEffect)(() => {
		const read = () => {
			target.current = readScrollProgress();
		};
		read();
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onMotion = () => {
			reduce.current = motion.matches;
		};
		onMotion();
		motion.addEventListener("change", onMotion);
		window.addEventListener("scroll", read, { passive: true });
		window.addEventListener("resize", read);
		return () => {
			motion.removeEventListener("change", onMotion);
			window.removeEventListener("scroll", read);
			window.removeEventListener("resize", read);
		};
	}, []);
	useFrame((state, delta) => {
		const g = group.current;
		if (!g) return;
		const dt = Math.min(delta, .05);
		const goal = target.current;
		if (reduce.current) smooth.current = goal;
		else {
			const k = 1 - Math.exp(-dt / ASTRONAUT.scrub);
			smooth.current += (goal - smooth.current) * k;
		}
		const c = smooth.current;
		const aspect = size.width / Math.max(1, size.height);
		const xFit = Math.min(1, aspect / (16 / 9));
		g.position.x = (ASTRONAUT.startX + c * (ASTRONAUT.endX - ASTRONAUT.startX)) * xFit;
		const bob = reduce.current ? 0 : Math.sin(state.clock.elapsedTime * ASTRONAUT.floatSpeed) * ASTRONAUT.floatAmplitude;
		const foot = -.38;
		g.position.y = ASTRONAUT.positionY - foot * ASTRONAUT.scale + bob;
		g.position.z = 0;
		const yawOffset = -Math.PI / 2;
		g.rotation.y = yawOffset + ASTRONAUT.initialRotationY + c * ASTRONAUT.rotationMultiplierY;
		g.rotation.x = ASTRONAUT.initialRotationX + c * ASTRONAUT.rotationMultiplierX;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		position: [
			ASTRONAUT.startX,
			ASTRONAUT.positionY,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
			object: scene,
			scale: ASTRONAUT.scale
		})
	});
}
useGLTF.preload(MODEL_URL);
function AstronautStage() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "astronaut-layer",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
			camera: {
				position: [
					0,
					ASTRONAUT.cameraY,
					ASTRONAUT.cameraZ
				],
				fov: ASTRONAUT.fov,
				near: .1,
				far: 40
			},
			dpr: [1, 1.75],
			gl: {
				antialias: true,
				alpha: true,
				powerPreference: "high-performance"
			},
			onCreated: ({ gl }) => {
				gl.setClearColor(0, 0);
				gl.toneMappingExposure = 1.35;
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: ASTRONAUT.ambientIntensity }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						5,
						5,
						5
					],
					intensity: ASTRONAUT.mainLightIntensity,
					color: LIGHTS.key
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						-5,
						0,
						-5
					],
					intensity: ASTRONAUT.rimLightIntensity,
					color: LIGHTS.rim
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					position: [
						0,
						-3,
						2
					],
					intensity: .5,
					color: LIGHTS.pink,
					distance: 10
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					position: [
						3,
						2,
						-2
					],
					intensity: .4,
					color: LIGHTS.cyan,
					distance: 10
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, {
					resolution: 64,
					frames: 1,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
							form: "rect",
							intensity: 2.2,
							color: LIGHTS.key,
							position: [
								0,
								2,
								6
							],
							scale: [
								12,
								6,
								1
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
							form: "rect",
							intensity: 1.4,
							color: LIGHTS.rim,
							position: [
								-5,
								1,
								-2
							],
							scale: [
								4,
								8,
								1
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
							form: "rect",
							intensity: 1,
							color: LIGHTS.pink,
							position: [
								0,
								-2,
								3
							],
							scale: [
								8,
								3,
								1
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageError, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Suit, {}) })
				})
			]
		})
	});
}
var PERKS = [
	{
		icon: Ticket,
		title: "Free Festival Pass",
		body: "Complimentary access to all events, pro-nights, and exclusive backstage tours.",
		tone: "pink"
	},
	{
		icon: Trophy,
		title: "Cash Rewards",
		body: "Earn up to ₹10,000+ based on registrations and performance milestones.",
		tone: "violet"
	},
	{
		icon: ScrollText,
		title: "Certificate & LOR",
		body: "Official certificate from IIT BHU and a Letter of Recommendation for top performers.",
		tone: "cyan"
	},
	{
		icon: Gift,
		title: "Exclusive Merch",
		body: "Limited edition CA kit with premium Kashi Yatra merchandise and goodies.",
		tone: "pink"
	},
	{
		icon: Handshake,
		title: "Networking",
		body: "Connect with 500+ student leaders from top colleges across India.",
		tone: "violet"
	},
	{
		icon: Award,
		title: "Leadership Skills",
		body: "Develop marketing, communication, and team management expertise.",
		tone: "cyan"
	}
];
var STEPS = [
	{
		n: "01",
		title: "Register",
		body: "Complete your profile and fill out the CA application form."
	},
	{
		n: "02",
		title: "Get Verified",
		body: "Our team reviews your application and assigns you as official CA."
	},
	{
		n: "03",
		title: "Spread the Word",
		body: "Share your unique referral code and bring participants from your college."
	},
	{
		n: "04",
		title: "Earn Rewards",
		body: "Unlock perks, cash prizes, and recognition based on your performance."
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "stage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cosmic",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nebula nebula-a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nebula nebula-b" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nebula nebula-c" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AstronautStage, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "IIT BHU · Kashi Yatra"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Campus ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ambassador" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede",
						children: "Be the face of your college at IIT BHU's grandest cultural festival. Lead, inspire, and unlock exclusive rewards."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "stats",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "500+" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Colleges" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "50K+" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Participants" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "₹2L+" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In prizes" })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "cta",
						href: "#apply",
						children: "Why join?"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel",
				id: "perks",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Why join?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Exclusive ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Perks" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede",
						children: "Being a Campus Ambassador isn't just a title — it's a launchpad for unforgettable experiences."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid",
						children: PERKS.map((perk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `card tone-${perk.tone}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(perk.icon, { "aria-hidden": "true" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: perk.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: perk.body })
							]
						}, perk.title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel",
				id: "journey",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "The journey"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["How it ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "works" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "steps",
						children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Step ", step.n] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: step.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step.body })
						] }, step.n))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel close",
				id: "apply",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
						className: "rocket",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Ready to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "lead" }),
						"?"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede",
						children: "Join the elite squad of Campus Ambassadors and make your mark at Kashi Yatra 2027. Limited spots available."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "cta",
						href: "mailto:ca@kashiyatra.iitbhu.ac.in",
						children: "Apply now"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "fine",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { "aria-hidden": "true" }), " Scroll the page — the suit crosses the sky and turns as you go."]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
