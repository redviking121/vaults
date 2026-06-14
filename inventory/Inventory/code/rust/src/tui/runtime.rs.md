// src/tui/runtime.rs
use crossterm::{
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::{backend::CrosstermBackend, Terminal};

use crate::tui::event::{EventConfig};
use crate::tui::event_loop::EventLoop;
use crate::tui::operator::{OperatorInterface};
use crate::tui::event::OperatorAction;

pub fn run_tui<O: OperatorInterface>(mut operator: O) -> crossterm::Result<()> {
    // Terminal setup
    enable_raw_mode()?;
    let mut stdout = std::io::stdout();
    execute!(stdout, EnterAlternateScreen)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let event_loop = EventLoop::new(EventConfig::default());

    let res = loop {
        // Draw
        terminal.draw(|f| {
            operator.render(f);
        })?;

        // Event dispatch
        if let Some(ev) = event_loop.next() {
            match operator.handle_event(ev) {
                OperatorAction::None => {}
                OperatorAction::Redraw => {
                    // next loop iteration will redraw anyway
                }
                OperatorAction::Quit => break Ok(()),
                OperatorAction::DispatchCommand(cmd) => {
                    // hook into your command bus / actor system here
                    println!("Dispatching command: {cmd}");
                }
            }
        } else {
            break Ok(());
        }
    };

    // Teardown
    disable_raw_mode()?;
    execute!(terminal.backend_mut(), LeaveAlternateScreen)?;
    terminal.show_cursor()?;

    res
}
