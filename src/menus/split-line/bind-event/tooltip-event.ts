/**
 * @description tooltip 事件
 * @author wangqiaoling
 */
import $, { DomElement } from '../../../utils/dom-core'
import Tooltip, { TooltipConfType } from '../../menu-constructors/Tooltip'
import Editor from '../../../editor/index'

let tooltip: Tooltip | null
let _editor: Editor

/**
 * 显示分割线的 tooltip
 * @param $splitLine 分割线元素
 */
function showSplitLineTooltip($splitLine: DomElement): void {
    // 定义 splitLine tooltip 配置
    const conf: TooltipConfType = [
        {
            $elem: $(`<span>${_editor.i18next.t('menus.panelMenus.删除')}</span>`),
            onClick: (editor: Editor, $splitLine: DomElement) => {
                // 选中 分割线 元素
                // console.log(editor.selection)
                $splitLine.addClass('w-e-split-line-mask')
                editor.selection.createRangeByElem($splitLine)
                editor.selection.restoreSelection()
                editor.cmd.do('delete')

                // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                return true
            },
        },
    ]
    // 实例化 tooltip
    tooltip = new Tooltip(_editor, $splitLine, conf)
    // 创建 tooltip
    tooltip.create()
}
/**
 * 隐藏分割线的 tooltip
 */
function hideSplitLineTooltip(): void {
    // 将 tooltip 移除

    if (tooltip) {
        tooltip.remove()
        tooltip = null
    }
}

function bindTooltipEvent(editor: Editor): void {
    _editor = editor

    // 点击分割线时，显示 tooltip
    editor.txt.eventHooks.splitLineEvents.push(showSplitLineTooltip)

    // 点击其他地方（工具栏、滚动、keyup）时，隐藏 tooltip
    editor.txt.eventHooks.clickEvents.push(hideSplitLineTooltip)
    editor.txt.eventHooks.keyupEvents.push(hideSplitLineTooltip)
    editor.txt.eventHooks.toolbarClickEvents.push(hideSplitLineTooltip)
    editor.txt.eventHooks.menuClickEvents.push(hideSplitLineTooltip)
    editor.txt.eventHooks.textScrollEvents.push(hideSplitLineTooltip)
}
export default bindTooltipEvent
