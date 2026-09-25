const interfaceConst = 'interface'

module.exports = (componentName, sliceName) => `import { memo } from 'react'
import cls from './${componentName}.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

${interfaceConst} ${componentName}Props {
    className?: string
}

export const ${componentName} = memo((props: ${componentName}Props) => {
    const { className } = props
    
    return (
        <div className={classNames(cls.${sliceName}, {}, [className])}>
        
        </div>
    )
})

${componentName}.displayName = '${componentName}'
`