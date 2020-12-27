# omegga-team-chat

A minigame team chat for Omegga. Includes support for whitelisting/blacklisting certain teams from
using team chat for hidden role gamemodes.

## Installation

Start in the working directory of your Omegga installation.

`cd plugins`

`git clone git://github.com/voximity/omegga-team-chat.git`

# Usage

By default, all teams of all minigames will be able to use `/t <message>` to send a message
to their team. As per below, the command, message prefix, and whitelist/blacklist behavior
can be altered.

# Configuration

| **Field** | **Default** | **Description** |
| --- | --- | --- |
| `command` | `t` | The name of the command to use for sending messages to team chat. For example, if the value is `t` (the default), then `/t hello world!` will send "hello world!" to your team. |
| `prefix` | `<b>[TEAM]</>` | The prefix before team chat messages. If the user `x` sent the message `hello`, the default value would display the message as `[TEAM] x: hello`. |
| `log` | on | Whether or not to put team messages in the server console like regular messages. |
| `enable-whitelist` | off | When on, the `team-list` field acts like a whitelist, where only teams in the list can use team chat. When off, `team-list` acts like a blacklist, where teams in the list are banned from using the team chat. |
| `team-list` | *blank* | A comma-separated list of teams that are affected by `enable-whitelist`. See above for details on whitelisting/blacklisting teams. |
