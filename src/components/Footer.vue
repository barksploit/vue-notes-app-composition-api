<template>
    <footer>
        Made by Thomas Griffin @ <a target="_blank" rel="noopener noreferrer" href="https://grfn.sh">grfn.sh</a> | <a href="https://github.com/barksploit/vue-notes-app" target="_blank" rel="noopener noreferrer">See on GitHub</a><img class="github-logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
    </footer>
</template>

<style lang="scss" scoped>
    footer {
        background-color: white;
        padding: 50px;
        position: absolute;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }
    .github-logo {
        height: 2em;
        vertical-align: middle;
        margin-left: 5px
    }
</style>