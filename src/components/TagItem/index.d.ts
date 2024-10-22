import * as React from 'react'
import { IStyle, ITheme } from '@uifabric/styling'
import { IPickerItemProps, IStyleFunctionOrObject } from '@fluentui/react'

export interface ITag {
    name: string;
    key: string;
}

export interface ITagItemProps extends IPickerItemProps<ITag> {
    className?: string;
    enableTagFocusInDisabledPicker?: boolean;
    styles?: IStyleFunctionOrObject<ITagItemStyleProps, ITagItemStyles>;
    theme?: ITheme;
}

export declare type ITagItemStyleProps = Required<Pick<ITagItemProps, 'theme'>> & Pick<ITagItemProps, 'className' | 'selected' | 'disabled'> & {};

export interface ITagItemStyles {
    root: IStyle;
    text: IStyle;
    close: IStyle;
}

export const TagItem: React.FC<ITagItemProps>
