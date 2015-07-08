#!/usr/bin/env bash
open -b com.invisionapp.InVisionSync
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd "$DIR/../Resources"

if [ ! -f "$HOME/fluxus-config.json" ]; then
  cat << EOF > "$HOME/fluxus-config.json"
// —- REMOVE FROM HERE —-
//
// The configuration is a JSON file. This is an example configuration created as a
// starting point.
// JSON files has some strict rules regarding format, that is why comment lines are not supported.
//
// Be very careful about the quotes, you need to use standard quotes: " "
// Some editors will insert textual quotes “ ” by default.
//
// The configuration is a list [] of objects [{}, {},…]
//
// Each object contains the following properties:
//
// "action" is the action to run, in this version only "extractpages" is supported.
//
// "inputFile" the full path of the file to watch for changes. It must be a PDF or AI file. AI files are treated as
// PDF, so this tool will not work with very old Illustrator files that are not PDF compatible.
//
// "outputDir" the full path of the output directory, generated PNG files will be placed there.
//
// "outputPrefix" a prefix used for the generated PNG files: prefix-1@2x.png, prefix-2@2x.png...
//
// TIP: There are many ways to get the full file or directory path. One quick way of getting it is to open a Terminal
// then drag and drop the file there. The full path will appear in the Terminal, copy & paste the full file path here.
//
// —- TO HERE, TO MAKE THE CONFIGURATION WORK --
[
  {
    "action": "extractpages",
    "inputFile": "/Users/youruser/somedir/myfile.ai",
    "outputDir": "/Users/youruser/InVision/Mulesoft/someproject/Screens",
    "outputPrefix": "prefix-forfiles"
  },
  {
    "action": "extractpages",
    "inputFile": "/Users/youruser/somedir/otherfile.ai",
    "outputDir": "/Users/youruser/InVision/Mulesoft/otherproject/Screens",
    "outputPrefix": "someprefix"
  }
]
EOF

  open -b com.github.atom "$HOME/fluxus-config.json" || open -b com.apple.TextEdit "$HOME/fluxus-config.json"
fi

./node ./app/bin/fluxus "$HOME/fluxus-config.json"
