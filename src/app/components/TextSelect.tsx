import { Range, merge_overlaps } from '../toyWasm';

import React from 'react';
import sortBy from 'lodash.sortby';

interface MarkProps {
    key: string;
    content: string;
    start: number;
    end: number;
    tag: string;
    color?: string;
    onClick: (a: any) => any;
}

const splitWithOffsets = (text: string, offsets: Range[]) => {
    let lastEnd = 0;
    const splits = [];

    for (let offset of sortBy(offsets, (o: Range) => o.start)) {
        const { start, end } = offset;

        if (lastEnd < start) {
            splits.push({
                start: lastEnd,
                end: start,
                content: text.slice(lastEnd, start),
            });
        }
        splits.push({
            start,
            end,
            mark: true,
            content: text.slice(start, end),
        });
        lastEnd = end;
    }
    if (lastEnd < text.length) {
        splits.push({
            start: lastEnd,
            end: text.length,
            content: text.slice(lastEnd, text.length),
        });
    }

    return splits;
};

const selectionIsEmpty = (selection: Selection) => {
    let position =
        selection.anchorNode && selection.focusNode
            ? selection.anchorNode.compareDocumentPosition(selection.focusNode)
            : null;

    return position === 0 && selection.focusOffset === selection.anchorOffset;
};

const selectionIsBackwards = (selection: Selection) => {
    if (selectionIsEmpty(selection)) return false;

    let position =
        selection.anchorNode && selection.focusNode
            ? selection.anchorNode.compareDocumentPosition(selection.focusNode)
            : null;

    let backward = false;
    if ((!position && selection.anchorOffset > selection.focusOffset) || position === Node.DOCUMENT_POSITION_PRECEDING)
        backward = true;

    return backward;
};

const Mark = (props: MarkProps) => (
    <mark
        className="bg-blue-600 text-white"
        data-start={props.start}
        data-end={props.end}
        onClick={() => props.onClick({ start: props.start, end: props.end })}
    >
        {props.content}
        {props.tag && <span style={{ fontSize: '0.7em', fontWeight: 500, marginLeft: 6 }}>{props.tag}</span>}
    </mark>
);

const Split = (props: any) => {
    if (props.mark) return <Mark {...props} />;

    return (
        <span
            data-start={props.start}
            data-end={props.end}
            onClick={() => props.onClick({ start: props.start, end: props.end })}
        >
            {props.content}
        </span>
    );
};

interface TextRange extends Range {
    text: string;
}

type TextBaseProps<T> = {
    content: string;
    value: T[];
    onChange: (value: T[]) => any;
    getSpan?: (span: TextRange) => T;
};

type TextSelectProps<T> = React.HTMLAttributes<HTMLDivElement> & TextBaseProps<T>;

export const TextSelect = <T extends Range>(props: TextSelectProps<T>) => {
    const getSpan = (span: TextRange): Range => {
        if (props.getSpan) return props.getSpan(span) as T;
        return new Range(span.start, span.end);
    };

    const handleMouseUp = () => {
        if (!props.onChange) return;

        const selection = window.getSelection();

        if (!selection || selectionIsEmpty(selection)) return;

        const anchorNodeStart = selection.anchorNode?.parentElement?.getAttribute('data-start');
        const focusNodeStart = selection.focusNode?.parentElement?.getAttribute('data-start');
        let start = anchorNodeStart ? parseInt(anchorNodeStart, 10) + selection.anchorOffset : 0;
        let end = focusNodeStart ? parseInt(focusNodeStart, 10) + selection.focusOffset : 0;

        if (start === end) return;

        if (selectionIsBackwards(selection)) {
            [start, end] = [end, start];
        }

        const mergedRanges = merge_overlaps([
            ...props.value,
            getSpan({
                start,
                end,
                text: props.content.slice(start, end),
                free: () => void 0,
            }),
        ]);

        props.onChange(mergedRanges as T[]);

        window.getSelection()?.empty();
    };

    const handleSplitClick = ({ start, end }: { start: number; end: number }) => {
        const splitIndex = props.value.findIndex((s) => s.start === start && s.end === end);
        if (splitIndex >= 0) {
            props.onChange([...props.value.slice(0, splitIndex), ...props.value.slice(splitIndex + 1)]);
        }
    };

    const { content, value, style } = props;
    const splits = splitWithOffsets(content, value);
    return (
        <div className="bg-gray border border-gray-200 p-1 pr-0" style={style} onMouseUp={handleMouseUp}>
            {splits.map((split) => (
                <Split key={`${split.start}-${split.end}`} {...split} onClick={handleSplitClick} />
            ))}
        </div>
    );
};
