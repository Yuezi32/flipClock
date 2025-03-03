/*
 * 翻牌数字
 * @author： 兔子先生
 * @media: 请关注微信公众号【卧梅又闻花】，获取最新优秀开发教程
 * @updateDate: 2025-03
 */

import { useEffect, useRef } from 'react'
import FlipCard from '../flipCard'
import './flipClock.css'

function FilpClock() {
    const timer = useRef(null)

    const flipCardHour1Ref = useRef(null)
    const flipCardHour2Ref = useRef(null)
    const flipCardMinute1Ref = useRef(null)
    const flipCardMinute2Ref = useRef(null)
    const flipCardSecond1Ref = useRef(null)
    const flipCardSecond2Ref = useRef(null)

    const flipCards = [
        flipCardHour1Ref,
        flipCardHour2Ref,
        flipCardMinute1Ref,
        flipCardMinute2Ref,
        flipCardSecond1Ref,
        flipCardSecond2Ref,
    ]

    useEffect(() => {
        // 开始计时
        const run = () => {
            timer.current = setInterval(() => {
                // 获取当前时间
                const now = new Date()
                const nowTimeStr = formatDate(
                    new Date(now.getTime() - 1000),
                    'hhiiss'
                )
                const nextTimeStr = formatDate(now, 'hhiiss')
                for (let i = 0; i < flipCards.length; i++) {
                    if (nowTimeStr[i] === nextTimeStr[i]) {
                        continue
                    }
                    flipCards[i].current.flipDown(nowTimeStr[i], nextTimeStr[i])
                }
            }, 1000)
        }
        run()
    })

    // 正则格式化日期
    const formatDate = (date, dateFormat) => {
        /* 单独格式化年份，根据y的字符数量输出年份
       * 例如：yyyy => 2019
              yy => 19
              y => 9
       */
        const yearMatch = dateFormat.match(/(y+)/)
        if (yearMatch) {
            dateFormat = dateFormat.replace(
                yearMatch[0],
                (date.getFullYear() + '').slice(-yearMatch[0].length)
            )
        }
        // 格式化月、日、时、分、秒
        const formatMap = {
            'm+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'i+': date.getMinutes(),
            's+': date.getSeconds(),
        }
        for (const key in formatMap) {
            const match = dateFormat.match(new RegExp(`(${key})`))
            if (match) {
                // 取出对应的值
                const str = formatMap[key] + ''
                /* 根据设置的格式，输出对应的字符
                 * 例如: 早上8时，hh => 08，h => 8
                 * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
                 * 例如: 下午15时，hh => 15, h => 15
                 */
                dateFormat = dateFormat.replace(
                    match[0],
                    match[0].length === 1 ? str : str.padStart(2, '0')
                )
            }
        }

        return dateFormat
    }

    // 初始化
    const now = new Date()
    const initNowTimeStr = formatDate(new Date(now.getTime()), 'hhiiss')

    return (
        <div className="FlipClock">
            <FlipCard ref={flipCardHour1Ref} initFrontText={initNowTimeStr[0]} />
            <FlipCard ref={flipCardHour2Ref} initFrontText={initNowTimeStr[1]} />
            <em>:</em>
            <FlipCard
                ref={flipCardMinute1Ref}
                initFrontText={initNowTimeStr[2]}
            />
            <FlipCard
                ref={flipCardMinute2Ref}
                initFrontText={initNowTimeStr[3]}
            />
            <em>:</em>
            <FlipCard
                ref={flipCardSecond1Ref}
                initFrontText={initNowTimeStr[4]}
            />
            <FlipCard
                ref={flipCardSecond2Ref}
                initFrontText={initNowTimeStr[5]}
            />
        </div>
    )
}

export default FilpClock
