const scenes = [
	{ kicker: "The beginning", title: "12 December 2021 — the day we became us.", description: "The first time I told you I loved you, and the day my heart quietly decided it wanted no one else but you.", caption: "The first page", date: "12 December 2021", image: "image/life1.jpg", imagePosition: "center" },
	{ kicker: "The little things", title: "Somehow, ordinary days became our favorite ones.", description: "The small jokes, the long talks, the comfortable silence. Every moment with you feels like a little spark that turns everyday life into something beautiful.", caption: "The in-between moments", date: "Chapter two", image: "image/life2.jpg", imagePosition: "center" },
	{ kicker: "The laughter", title: "You are still the easiest person to laugh with.", description: "Your smile changes the whole mood of the room, and even my quietest days become brighter when you are beside me.", caption: "Our kind of chaos", date: "Chapter three", image: "image/life3.jpg", imagePosition: "center" },
	{ kicker: "The real parts", title: "We found our way through the harder days, too.", description: "Not every scene was perfect, but we stayed. And that is the part of our story I cherish most — choosing each other with love and patience.", caption: "Still choosing us", date: "Chapter four", image: "image/life4.jpg", extraImage: "image/more.jpg", imagePosition: "center" },
	{ kicker: "The why", title: "You make my world feel more like home.", description: "You are kind, unforgettable, and entirely yourself. That is why every future I imagine has your laughter, your warmth, and your name in it.", caption: "My favorite person", date: "Chapter five", image: "image/life5.jpg", imagePosition: "center" }
];

const panels = ["opening", "story", "interlude", "ending", "celebration"];
const $ = (id) => document.getElementById(id);

const bgMusic = $("bgMusic");

function startMusic() {
	if (!bgMusic) return;
	bgMusic.muted = false;
	bgMusic.volume = 0.45;
	bgMusic.play().catch(() => {
		console.log("Audio will start after the first user interaction.");
	});
}

function renderStory() {
	$("storyBook").innerHTML = scenes.map((scene, index) => `
		<article class="story-page" data-page="0${index + 1}" aria-label="Scene ${index + 1}">
			<div class="page-copy">
				<p class="scene-kicker">${scene.kicker}</p>
				<h2>${scene.title}</h2>
				<p class="page-description">${scene.description}</p>
			</div>
			<figure class="page-frame">
				<div class="page-image-grid${scene.extraImage ? " two" : ""}">
					<div class="page-image" style="background-image: url('${scene.image}'); background-position: ${scene.imagePosition};"></div>
					${scene.extraImage ? `<div class="page-image extra" style="background-image: url('${scene.extraImage}'); background-position: ${scene.imagePosition};"></div>` : ""}
				</div>
				<figcaption><span>${scene.caption}</span><span>${scene.date}</span></figcaption>
			</figure>
		</article>
	`).join("");
}

function updateProgress() {
	const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
	$("progressBar").style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
}

function scrollToPanel(panelId) {
	$(panelId).scrollIntoView({ behavior: "smooth", block: "start" });
}

renderStory();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
window.addEventListener("load", startMusic);
document.addEventListener("pointerdown", startMusic, { once: true });

$("startButton").addEventListener("click", () => scrollToPanel("story"));
$("continueButton").addEventListener("click", () => scrollToPanel("ending"));
$("yesButton").addEventListener("click", () => { scrollToPanel("celebration"); createHearts(); });
$("maybeButton").addEventListener("mouseenter", (event) => {
	const button = event.currentTarget;
	button.style.position = "fixed";
	button.style.left = `${Math.max(12, Math.random() * (window.innerWidth - button.offsetWidth - 24))}px`;
	button.style.top = `${Math.max(12, Math.random() * (window.innerHeight - button.offsetHeight - 24))}px`;
});

function createHearts() {
	const container = $("celebration").querySelector(".hearts");
	container.innerHTML = "";
	for (let index = 0; index < 24; index += 1) {
		const heart = document.createElement("span");
		heart.className = "heart";
		heart.textContent = "♥";
		heart.style.left = `${Math.random() * 100}%`;
		heart.style.bottom = `${-10 - Math.random() * 20}%`;
		heart.style.animationDelay = `${Math.random() * 2}s`;
		heart.style.fontSize = `${12 + Math.random() * 25}px`;
		container.appendChild(heart);
	}
}
