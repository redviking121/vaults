// src/app/operator_impl.rs
use ratatui::{
    layout::{Constraint, Direction, Layout},
    widgets::{Block, Borders, Paragraph},
    Frame,
};

use crate::tui::event::{Event, InputEvent};
use crate::tui::operator::{OperatorInterface};
use crate::tui::event::OperatorAction;
use crossterm::event::{KeyCode};

pub struct AppOperator {
    status: String,
}

impl AppOperator {
    pub fn new() -> Self {
        Self {
            status: "Ready".into(),
        }
    }
}

impl OperatorInterface for AppOperator {
    fn handle_event(&mut self, event: Event) -> OperatorAction {
        match event {
            Event::Input(InputEvent::Key(k)) => match k.code {
                KeyCode::Char('q') => OperatorAction::Quit,
                KeyCode::Char('r') => {
                    self.status = "Reload requested".into();
                    OperatorAction::DispatchCommand("reload".into())
                }
                _ => OperatorAction::None,
            },
            Event::Tick => {
                // periodic updates
                OperatorAction::Redraw
            }
            Event::External(msg) => {
                self.status = format!("External: {msg}");
                OperatorAction::Redraw
            }
            _ => OperatorAction::None,
        }
    }

    fn render(&mut self, f: &mut Frame) {
        let chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([Constraint::Min(1)].as_ref())
            .split(f.size());

        let block = Block::default().title("Operator").borders(Borders::ALL);
        let p = Paragraph::new(self.status.clone()).block(block);
        f.render_widget(p, chunks[0]);
    }
}
