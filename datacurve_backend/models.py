from sqlalchemy import Column, Integer, String
from database import Base


class CodeItem(Base):
    __tablename__ = "code items"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    output = Column(String)
