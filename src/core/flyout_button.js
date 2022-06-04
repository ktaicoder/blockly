/**
 * core/flyout_button.js를 복사해서 변경
 * 변경한 부분:
 * Label인 경우 AIMK용 스타일을 적용
 *
 * aimk 주석을 참고
 */

/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class for a button in the flyout.
 */
'use strict';

/**
 * Class for a button in the flyout.
 * @class
 */
goog.module('Blockly.FlyoutButton');

const Css = goog.require('Blockly.Css');
const browserEvents = goog.require('Blockly.browserEvents');
const dom = goog.require('Blockly.utils.dom');
const style = goog.require('Blockly.utils.style');
/* eslint-disable-next-line no-unused-vars */
const toolbox = goog.requireType('Blockly.utils.toolbox');
const parsing = goog.require('Blockly.utils.parsing');
const { Coordinate } = goog.require('Blockly.utils.Coordinate');
const { Svg } = goog.require('Blockly.utils.Svg');
/* eslint-disable-next-line no-unused-vars */
const { WorkspaceSvg } = goog.requireType('Blockly.WorkspaceSvg');

// aimk
const LABEL_MIN_WIDTH = 260
const LABEL_MARGIN_TOP = 16
const LABEL_MARGIN_BOTTOM = 0

/**
 * Class for a button or label in the flyout.
 * @alias Blockly.FlyoutButton
 */
class FlyoutButton {
    /**
     * @param {!WorkspaceSvg} workspace The workspace in which to place this
     *     button.
     * @param {!WorkspaceSvg} targetWorkspace The flyout's target workspace.
     * @param {!toolbox.ButtonOrLabelInfo} json
     *    The JSON specifying the label/button.
     * @param {boolean} isLabel Whether this button should be styled as a label.
     * @package
     */
    constructor(workspace, targetWorkspace, json, isLabel) {
        /**
         * @type {!WorkspaceSvg}
         * @private
         */
        this.workspace_ = workspace;

        /**
         * @type {!WorkspaceSvg}
         * @private
         */
        this.targetWorkspace_ = targetWorkspace;

        /**
         * @type {string}
         * @private
         */
        this.text_ = json['text'];

        /**
         * @type {!Coordinate}
         * @private
         */
        this.position_ = new Coordinate(0, 0);

        /**
         * Whether this button should be styled as a label.
         * Labels behave the same as buttons, but are styled differently.
         * @type {boolean}
         * @private
         */
        this.isLabel_ = isLabel;

        /**
         * The key to the function called when this button is clicked.
         * @type {string}
         * @private
         */
        this.callbackKey_ = json['callbackKey'] ||
            /* Check the lower case version too to satisfy IE */
            json['callbackkey'];

        /**
         * If specified, a CSS class to add to this button.
         * @type {?string}
         * @private
         */
        this.cssClass_ = json['web-class'] || null;

        /**
         * Mouse up event data.
         * @type {?browserEvents.Data}
         * @private
         */
        this.onMouseUpWrapper_ = null;

        /**
         * The JSON specifying the label / button.
         * @type {!toolbox.ButtonOrLabelInfo}
         */
        this.info = json;

        /**
         * The width of the button's rect.
         * @type {number}
         */
        this.width = 0;

        /**
         * The height of the button's rect.
         * @type {number}
         */
        this.height = 0;

        /**
         * The root SVG group for the button or label.
         * @type {?SVGGElement}
         * @private
         */
        this.svgGroup_ = null;

        /**
         * The SVG element with the text of the label or button.
         * @type {?SVGTextElement}
         * @private
         */
        this.svgText_ = null;
    }

    /**
     * Create the button elements.
     * @return {!SVGElement} The button's SVG group.
     */
    createDom() {
        let cssClass = this.isLabel_ ? 'blocklyFlyoutLabel' : 'blocklyFlyoutButton';
        if (this.cssClass_) {
            cssClass += ' ' + this.cssClass_;
        }

        this.svgGroup_ = dom.createSvgElement(
            Svg.G, { 'class': cssClass }, this.workspace_.getCanvas());

        let shadow;
        if (!this.isLabel_) {
            // Shadow rectangle (light source does not mirror in RTL).
            shadow = dom.createSvgElement(
                Svg.RECT, {
                'class': 'blocklyFlyoutButtonShadow',
                'rx': 4,
                'ry': 4,
                'x': 1,
                'y': 1,
            },
                this.svgGroup_);
        }
        // Background rectangle.
        const rect = dom.createSvgElement(
            Svg.RECT, {
            'class': this.isLabel_ ? 'blocklyFlyoutLabelBackground' :
                'blocklyFlyoutButtonBackground',
            'rx': 4,
            'ry': 4,
        },
            this.svgGroup_);
        // aimk-label
        let line1 = null;
        let line2 = null;
        if (this.isLabel_) {
            line1 = dom.createSvgElement(
                Svg.LINE,
                {
                    x1: 0, y1: 0, x2: 0, y2: 0,
                    style: 'stroke-width:1;stroke:rgba(113, 123, 138, 0.5);',
                },
                this.svgGroup_,
            );
            line2 = dom.createSvgElement(
                Svg.LINE,
                {
                    x1: 0, y1: 0, x2: 0, y2: 0,
                    style: 'stroke-width:1;stroke:rgba(113, 123, 138, 0.5);',
                },
                this.svgGroup_,
            );
        }

        const svgText = dom.createSvgElement(
            Svg.TEXT, {
            'class': this.isLabel_ ? 'blocklyFlyoutLabelText' : 'blocklyText',
            'x': 0,
            'y': 0,
            'text-anchor': 'middle',
        },
            this.svgGroup_);
        let text = parsing.replaceMessageReferences(this.text_);
        if (this.workspace_.RTL) {
            // Force text to be RTL by adding an RLM.
            text += '\u200F';
        }
        svgText.textContent = text;
        if (this.isLabel_) {
            this.svgText_ = svgText;
            this.workspace_.getThemeManager().subscribe(
                this.svgText_, 'flyoutForegroundColour', 'fill');


            // aimk
            this.line1_ = line1
            this.line2_ = line2
            this.workspace_.getThemeManager().subscribe(
                this.line1_, 'flyoutForegroundColour', 'stroke');
            this.workspace_.getThemeManager().subscribe(
                this.line2_, 'flyoutForegroundColour', 'stroke');
        }

        const fontSize = style.getComputedStyle(svgText, 'fontSize');
        const fontWeight = style.getComputedStyle(svgText, 'fontWeight');
        const fontFamily = style.getComputedStyle(svgText, 'fontFamily');
        this.width = dom.getFastTextWidthWithSizeString(
            svgText, fontSize, fontWeight, fontFamily);
        const fontMetrics =
            dom.measureFontMetrics(text, fontSize, fontWeight, fontFamily);
        this.height = fontMetrics.height;

        // aimk
        const textWidth = this.width
        if (this.isLabel_) {
            this.width = Math.max(textWidth + 24, LABEL_MIN_WIDTH)
        }

        if (!this.isLabel_) {
            this.width += 2 * FlyoutButton.TEXT_MARGIN_X;
            this.height += 2 * FlyoutButton.TEXT_MARGIN_Y;
            shadow.setAttribute('width', this.width);
            shadow.setAttribute('height', this.height);
        } else {
            // aimk add else
            this.height += LABEL_MARGIN_TOP + LABEL_MARGIN_BOTTOM
        }
        rect.setAttribute('width', this.width);
        rect.setAttribute('height', this.height);

        if (this.isLabel_) {
            // aimk add if condition
            const lineLength = (this.width - textWidth) / 2;
            const lineTop = (this.height + LABEL_MARGIN_TOP) / 2;
            line1.setAttribute('x1', 0);
            line1.setAttribute('y1', lineTop);
            line1.setAttribute('x2', lineLength - 12);
            line1.setAttribute('y2', lineTop);

            line2.setAttribute('x1', this.width - lineLength + 12);
            line2.setAttribute('y1', lineTop);
            line2.setAttribute('x2', this.width);
            line2.setAttribute('y2', lineTop);

            svgText.setAttribute('x', this.width / 2);
            svgText.setAttribute(
                'y',
                // eslint-disable-next-line max-len
                this.height / 2 - fontMetrics.height / 2 + fontMetrics.baseline + LABEL_MARGIN_TOP / 2,
            );
        } else {
            svgText.setAttribute('x', this.width / 2);
            svgText.setAttribute(
                'y', this.height / 2 - fontMetrics.height / 2 + fontMetrics.baseline);
        }
        this.updateTransform_();

        this.onMouseUpWrapper_ = browserEvents.conditionalBind(
            this.svgGroup_, 'mouseup', this, this.onMouseUp_);
        return this.svgGroup_;
    }

    /**
     * Correctly position the flyout button and make it visible.
     */
    show() {
        this.updateTransform_();
        this.svgGroup_.setAttribute('display', 'block');
    }

    /**
     * Update SVG attributes to match internal state.
     * @private
     */
    updateTransform_() {
        this.svgGroup_.setAttribute(
            'transform',
            'translate(' + this.position_.x + ',' + this.position_.y + ')');
    }

    /**
     * Move the button to the given x, y coordinates.
     * @param {number} x The new x coordinate.
     * @param {number} y The new y coordinate.
     */
    moveTo(x, y) {
        this.position_.x = x;
        this.position_.y = y;
        this.updateTransform_();
    }

    /**
     * @return {boolean} Whether or not the button is a label.
     */
    isLabel() {
        return this.isLabel_;
    }

    /**
     * Location of the button.
     * @return {!Coordinate} x, y coordinates.
     * @package
     */
    getPosition() {
        return this.position_;
    }

    /**
     * @return {string} Text of the button.
     */
    getButtonText() {
        return this.text_;
    }

    /**
     * Get the button's target workspace.
     * @return {!WorkspaceSvg} The target workspace of the flyout where this
     *     button resides.
     */
    getTargetWorkspace() {
        return this.targetWorkspace_;
    }

    /**
     * Dispose of this button.
     */
    dispose() {
        if (this.onMouseUpWrapper_) {
            browserEvents.unbind(this.onMouseUpWrapper_);
        }
        if (this.svgGroup_) {
            dom.removeNode(this.svgGroup_);
        }
        if (this.svgText_) {
            this.workspace_.getThemeManager().unsubscribe(this.svgText_);
        }
    }

    /**
     * Do something when the button is clicked.
     * @param {!Event} e Mouse up event.
     * @private
     */
    onMouseUp_(e) {
        const gesture = this.targetWorkspace_.getGesture(e);
        if (gesture) {
            gesture.cancel();
        }

        if (this.isLabel_ && this.callbackKey_) {
            console.warn(
                'Labels should not have callbacks. Label text: ' + this.text_);
        } else if (
            !this.isLabel_ &&
            !(this.callbackKey_ &&
                this.targetWorkspace_.getButtonCallback(this.callbackKey_))) {
            console.warn('Buttons should have callbacks. Button text: ' + this.text_);
        } else if (!this.isLabel_) {
            this.targetWorkspace_.getButtonCallback(this.callbackKey_)(this);
        }
    }
}

/**
 * The horizontal margin around the text in the button.
 */
FlyoutButton.TEXT_MARGIN_X = 5;

/**
 * The vertical margin around the text in the button.
 */
FlyoutButton.TEXT_MARGIN_Y = 2;

/**
 * CSS for buttons and labels. See css.js for use.
 */
Css.register(`
 .blocklyFlyoutButton {
   fill: #888;
   cursor: default;
 }

 .blocklyFlyoutButtonShadow {
   fill: #666;
 }

 .blocklyFlyoutButton:hover {
   fill: #aaa;
 }

 .blocklyFlyoutLabel {
   cursor: default;
 }

 .blocklyFlyoutLabelBackground {
   opacity: 0;
 }
 `);

exports.FlyoutButton = FlyoutButton;
