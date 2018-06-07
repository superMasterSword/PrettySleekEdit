# PrettySleekEdit
An edit of mjshi's PrettySleekGauges

Changes to main plugin:
- Made compatible with Yanfly's Absorption Barrier
- Replaced Special_Gauge _critTextColor property with _type property
- Added critText function to Special_Gauge in place of the property
- Changed Special_Gauge's drawGauge function's switch-case to check type
  property instead of text
- Changed Special_Gauge's drawText function to calculate text width instead
  of using fixed numbers
- Made it possible to show a number value without having a maximum
  (admittedly this was mostly for compatibility with one of my plugins)
- Changed Special_Gauge's constructor to take type instead of critText,
  and changed all instantiations to give new parameter.
- Changed all uses of $dataEnemies[enemyObj.enemyId()] to enemyObj.enemy()
- Added a check to stop actor target window from animating and just show
  current state of actors. (before it would animate from whatever the
  values were when it was last brought up)
- Moved class declarations outside of function so they can be accessed
  by other plugins.

Changes to patch:
- Made compatible with Yanfly's Absorption Barrier
- Changed drawActorTp to use actor's maxTp function
- Made doneUpdating alias the old one so the patch is less likely to need updating
