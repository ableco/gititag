const term = require("terminal-kit").terminal;
const simpleGit = require("simple-git");
const git = simpleGit();

(async () => {
  const { current: branch } = await git.branch();
  term("Welcome to git interactive tag!\n");
  term("Your current branch is: ").green("%s\n", branch);
})();
