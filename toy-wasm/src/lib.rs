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

// 1. no overlap
// 2. right inside left
// 3. overlap
