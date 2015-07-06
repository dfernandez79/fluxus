Fluxus
======

Fluxus it's a utility that scans for file changes and executes certain workflows.
Probably the most original utility in the world ;)

Not ready for mass consumption
------------------------------

This utility started to *scratch my own itch*: I needed to automate my design workflow of exporting
Illustrator files to InVision. InVision can read Sketch files and generate screens for it, but the feature is not
supported for Illustrator.

I tried with different approaches: MacOSX folder actions were a painful experience, and doesn't detect file changes
very well. An Illustrator plugin wiil resolve my need. But it requires lots of work, and I can resolve my need using other
tools (like a MacOSX Workflow to extract images from PDF).

So I end using NodeJS. It's easy for me to code in it, resolves my problem, and it can be extended to execute other actions.
