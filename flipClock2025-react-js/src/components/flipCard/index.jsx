/*
 * 翻牌数字
 * @author： 兔子先生
 * @media: 请关注微信公众号【卧梅又闻花】，获取最新优秀开发教程
 * @updateDate: 2025-03
 */

import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import './flipCard.css'
function FlipCard(
    {
        // 初始前牌文字
        initFrontText = '0',
        // 初始后牌文字
        initBackText = '1',
        // 翻牌动画时间，与CSS中设置的animation-duration保持一致
        duration = 600,
    },
    ref
) {
    // 是否正在翻转中
    const [isFlipping, setIsFlipping] = useState(false)
    // 翻转类型，down=向下翻转，up=向上翻转
    const [flipType, setFlipType] = useState('down')
    // 前牌文字
    const [frontText, setFrontText] = useState(initFrontText)
    // 后牌文字
    const [backText, setBackText] = useState(initBackText)

    // 翻转
    const flip = ({ type, newFrontText, newBackText }) => {
        if (isFlipping) {
            return false
        }
        setFrontText(newFrontText)
        setBackText(newBackText)
        setFlipType(type)
        setIsFlipping(true)

        setTimeout(() => {
            setFrontText(newBackText)
            setIsFlipping(false)
        }, duration)
    }
    useImperativeHandle(ref, () => {
        return {
            // 下翻牌
            flipDown: (newFrontText, newBackText) => {
                flip({ type: 'down', newFrontText, newBackText })
            },
            // 上翻牌
            flipUp: (newFrontText, newBackText) => {
                flip({ type: 'up', newFrontText, newBackText })
            },
        }
    })

    return (
        <div
            className={['M-FlipCard', flipType, isFlipping ? 'go' : null].join(
                ' '
            )}
        >
            <div className={'digital front number' + frontText}></div>
            <div className={'digital back number' + backText}></div>
        </div>
    )
}

FlipCard.propTypes = {
    initFrontText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    initBackText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    duration: PropTypes.number,
}

export default forwardRef(FlipCard)
