# Emoji bot

[Invite](https://discordapp.com/api/oauth2/authorize?client_id=396664345209208842&permissions=1073741824&scope=bot)|[Support](https://discord.gg/yk8z9bz)

Default prefix for the bot is `em!` but can be changed by any server administrator using [`em!set prefix`](#set)

## Avatar

Usage: `<prefix>avatar <url>`
Requires: Bot owner

## Emoji

Usage: `<prefix>emoji [add <url> <name>]|[delete <name>]|[edit name <old name> <new name>]`
Requires: Manage Emojis

## Eval

Usage: `<prefix>eval <javascript>`
Requires: Bot owner

## Help

Usage: `<prefix>help [command]`
Requires: Send Message
Details:
On it's own when executing help, the command will list all
commands available to the user sending the message,
providing `[command]` will show a basic help message and
examples of how to use said command.

## Info

Usage: `<prefix>info`
Requires: Send Message

## Ping

Usage: `<prefix>ping`
Requires: Send Message

## Reload

Usage: `<prefix>reload`
Requires: Bot owner

## Set

Usage: `<prefix>set [changelog <channel-name>]|[list <channel-name>]|[prefix <new prefix>]`
Requires: Administrator
Details:
`<channel-name>` Should not be a channel mention, just the name of the room, if the room doesn't exist, the feature is disabled.

## UpdateList

Usage: `<prefix>updatelist`
Requires: Manage Emojis
Details:
Wipes all messages in channel defined by the list command above, `#emoji-list` by default.
Posts all emojis present on current guild + their name