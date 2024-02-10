use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]

pub struct Range {
    pub start: u32,
    pub end: u32,
}

#[wasm_bindgen]
impl Range {
    #[wasm_bindgen(constructor)]
    pub fn new(start: u32, end: u32) -> Range {
        Range { start, end }
    }
}

#[wasm_bindgen]
pub fn merge_overlaps(ranges: Vec<Range>) -> Vec<Range> {
    let mut sorted = ranges.clone();
    sorted.sort_by_key(|span| span.start);

    let mut merged: Vec<Range> = Vec::new();

    for right in sorted {
        if let Some(left) = merged.last_mut() {
            if left.end >= right.start {
                left.end = left.end.max(right.end);
                continue;
            }
        }

        merged.push(right);
    }

    merged
}

#[cfg(test)]
mod tests_merge_overlaps {
    use super::*;

    #[test]
    fn it_should_merge_overlaps() {
        let ranges = vec![
            Range::new(1, 3),
            Range::new(2, 4),
            Range::new(5, 7),
            Range::new(6, 8),
        ];
        let merged = merge_overlaps(ranges);
        assert_eq!(merged.len(), 2);
        assert_eq!(merged[0].start, 1);
        assert_eq!(merged[0].end, 4);
        assert_eq!(merged[1].start, 5);
        assert_eq!(merged[1].end, 8);
    }

    #[test]
    fn it_should_merge_if_one_range_inside_another() {
        let ranges = vec![
            Range::new(1, 3),
            Range::new(2, 4),
            Range::new(5, 7),
            Range::new(6, 8),
            Range::new(1, 8),
        ];
        let merged = merge_overlaps(ranges);
        assert_eq!(merged.len(), 1);
        assert_eq!(merged[0].start, 1);
        assert_eq!(merged[0].end, 8);
    }
}
