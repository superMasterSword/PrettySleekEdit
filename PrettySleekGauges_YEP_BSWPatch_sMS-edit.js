/*:
 * @plugindesc Compatibility patch for Yanfly Battle Status Window
 * @author mjshi
 *
 * @help 
 * ----------------------------------------------------------------------------
 *   Pretty Sleek Gauges Yanfly Battle Status Window Patch v1.0a
 *     For Pretty Sleek Gauges versions v1.02b and up
 * ----------------------------------------------------------------------------
 *   Installation: Place below Pretty Sleek Gauges and Yanfly Battle Status.
 *   May slightly impact performance, hence, this is a separate plugin.
 * ----------------------------------------------------------------------------
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 * 
 */

(function() {
if (Imported.YEP_BattleStatusWindow && Imported.PrettySleekGauges) {

//=============================================================================
// Configuration
//
var HeightOffset = 8;

//
// End Configuration
//=============================================================================

var animatedNumbers = (PluginManager.parameters('PrettySleekGauges')['Animated Numbers'] || "true") === "true";
var animatedGauges = (PluginManager.parameters('PrettySleekGauges')['Animated Gauges'] || "true") === "true";
var criticalHP = (PluginManager.parameters('PrettySleekGauges')['Critical HP Change'] || "true") === "true";
var criticalMP = (PluginManager.parameters('PrettySleekGauges')['Critical MP Change'] || "false") === "true";
var criticalTP = (PluginManager.parameters('PrettySleekGauges')['Critical TP Change'] || "false") === "true";

Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
    this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
    this._enableYBuffer = true;
    var wy = rect.y + rect.height - this.lineHeight();
    var wymod = 8 * 2 + 6;
    if (this.getGaugesDrawn(actor) <= 2) {
      this.drawActorMp(actor, rect.x, wy, rect.width);
    } else {
      var ww = rect.width / 2;
      this.drawActorMp(actor, rect.x, wy, ww);
      this.drawActorTp(actor, rect.x + ww, wy, ww);
    }
    this.drawActorHp(actor, rect.x, wy - wymod, rect.width);
    this._enableYBuffer = false;
};

Window_BattleStatus.prototype.drawActorHp = function(actor, x, y, width) {
	width = width || 186;
	if (Imported.YEP_AbsorptionBarrier) {
		this.drawAnimatedGauge(x, y, width, actor, this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	} else {
		this.drawAnimatedGauge(x, y, width, actor.hpRate(), this.hpGaugeColor1(), this.hpGaugeColor2(), "hp");
	}
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.hpA, actor.hp, actor.mhp, HeightOffset);
	this._gauges[this.makeGaugeKey(x, y)].update();
}

Window_BattleStatus.prototype.drawActorMp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.mpRate(), this.mpGaugeColor1(), this.mpGaugeColor2(), "mp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.mpA, actor.mp, actor.mmp, HeightOffset);
	this._gauges[this.makeGaugeKey(x, y)].update();
}

Window_BattleStatus.prototype.drawActorTp = function(actor, x, y, width) {
	width = width || 186;
	this.drawAnimatedGauge(x, y, width, actor.tpRate(), this.tpGaugeColor1(), this.tpGaugeColor2(), "tp");
	this._gauges[this.makeGaugeKey(x, y)].setExtra(TextManager.tpA, actor.tp, actor.maxTp(), HeightOffset);
	this._gauges[this.makeGaugeKey(x, y)].update();
}

var SpecialGauge_doneUpdating = Special_Gauge.prototype.doneUpdating;
Special_Gauge.prototype.doneUpdating = function() {
	return SpecialGauge_doneUpdating.call(this) && !(SceneManager._scene instanceof Scene_Battle);
};

}

})();