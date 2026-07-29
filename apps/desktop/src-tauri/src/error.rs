use thiserror::Error;

/// Result alias for the Aikitr backend.
pub type AppResult<T> = Result<T, AppError>;

/// Unified error type for the Tauri backend. Serializes into a stable shape
/// consumed by the frontend error model.
#[derive(Debug, Error)]
pub enum AppError {
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    #[error("serde error: {0}")]
    Serde(#[from] serde_json::Error),

    #[error("invalid input: {0}")]
    InvalidInput(String),

    #[error("not found: {0}")]
    NotFound(String),

    #[error("internal error: {0}")]
    Internal(String),
}

impl serde::Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use serde::ser::SerializeStruct;
        let (code, message) = match self {
            AppError::Io(_) => ("IO", self.to_string()),
            AppError::Serde(_) => ("SERDE", self.to_string()),
            AppError::InvalidInput(_) => ("INVALID_INPUT", self.to_string()),
            AppError::NotFound(_) => ("NOT_FOUND", self.to_string()),
            AppError::Internal(_) => ("INTERNAL", self.to_string()),
        };
        let mut s = serializer.serialize_struct("AppError", 2)?;
        s.serialize_field("code", code)?;
        s.serialize_field("message", &message)?;
        s.end()
    }
}
