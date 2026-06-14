// src/tui/operator.rs
use crate::tui::event::{Event};
use crate::tui::event::OperatorAction;

pub trait OperatorInterface {
    fn handle_event(&mut self, event: Event) -> OperatorAction;
    fn render(&mut self, frame: &mut ratatui::Frame);
}
