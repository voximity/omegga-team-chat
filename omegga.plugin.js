class TeamChat {
    constructor(omegga, config, store) {
        this.omegga = omegga;
        this.config = config;
        this.store = store;
    }

    async init() {
        this.omegga.on(`cmd:${this.config.command}`, async (name, ...contents) => {
            const minigames = await this.omegga.getMinigames();
            const belongingMinigame = minigames.find((m) => m.name != "GLOBAL" && m.members.find((p) => p.name == name));
            if (belongingMinigame == undefined) {
                this.omegga.whisper(name, '<color="d4695f">You do not belong to any minigames.</>');
                return;
            }

            const belongingTeam = belongingMinigame.teams.find((t) => t.members.find((m) => m.name == name));
            if (belongingTeam == undefined) {
                this.omegga.whisper(name, `<color="d4695f">You do not belong to the team in the <b>${belongingMinigame.name}</> minigame.</>`);
                return;
            }

            if (this.config["enable-whitelist"] != this.config["team-list"].split(",").map((t) => t.toLowerCase()).includes(belongingTeam.name.toLowerCase())) {
                this.omegga.whisper(name, `<color="d4695f">Your team is not allowed to team chat.</>`);
                return;
            }

            const content = OMEGGA_UTIL.chat.parseLinks(OMEGGA_UTIL.chat.sanitize(contents.join(" ")));
            const color = OMEGGA_UTIL.color.rgbToHex(belongingTeam.color || {r: 255, g: 255, b: 255, a: 255});

            belongingTeam.members.forEach((m) => {
                this.omegga.whisper(m.name, `<color="${color}">${this.config.prefix != "" ? `${this.config.prefix} ` : ""}<b>${name}:</></> ${content}`);
                if (this.config.log) console.log(`${name} TO TEAM: ${content}`);
            });
        });

        return {"registeredCommands": [this.config.command]};
    }

    async stop() {}
}

module.exports = TeamChat;
