// src/tui/event.rs
use std::time::Duration;

#[derive(Debug, Clone)]
pub enum InputEvent {
    Key(crossterm::event::KeyEvent),
    Mouse(crossterm::event::MouseEvent),
    Resize(u16, u16),
}

#[derive(Debug, Clone)]
pub enum Event {
    Input(InputEvent),
    Tick,
    External(String), // or a generic payload type
}

#[derive(Debug)]
pub enum OperatorAction {
    None,
    Redraw,
    Quit,
    DispatchCommand(String),
    // Add domain-specific actions here
}

#[derive(Debug, Clone)]
pub struct EventConfig {
    pub tick_rate: Duration,
}

impl Default for EventConfig {
    fn default() -> Self {
        Self {
            tick_rate: Duration::from_millis(250),
        }
    }
}
