Create DATABASE TennisTimer;

Create TABLE Users(
	UserName VARCHAR(20) PRIMARY KEY ,
	PasswordHash VARBINARY(MAX) NOT NULL,
	PasswordSalt VARBINARY(MAX) NOT NULL
);

Create Table Roles(
	RoleId int PRIMARY KEY,
	RoleName Varchar(20) NOT NULL
);

Create Table UserRole(
	UserName VARCHAR(20) PRIMARY KEY,
	RoleId int NOT NULL,
	FOREIGN KEY (UserName) REFERENCES Users(UserName) ON DELETE CASCADE,
	FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) ON DELETE CASCADE
);

Create Table Court (
	CourtId INT IDENTITY(1,1) PRIMARY KEY,
	CourtName VARCHAR(20) NOT NULL,
	CourtLocation VARCHAR(50) NOT NULL,
	CourtImg1 VARBINARY(MAX),
	CourtImg2 VARBINARY(MAX),
	CourtImg3 VARBINARY(MAX)
);

Create Table CourtBooking(
	BookingID INT IDENTITY(1,1) PRIMARY KEY,
	CourtId INT NOT NULL,
	BookingDate DateTime NOT NULL,
	Slot1 INT,
	Slot2 INT,
	Slot3 INT,
	UserName VARCHAR(20) NOT NUll
	FOREIGN KEY (CourtId) REFERENCES Court(CourtId) ON DELETE CASCADE,
	FOREIGN KEY (UserName) REFERENCES Users(UserName) ON DELETE CASCADE
);

Create Table CourtReview(
	ReviewId INT IDENTITY(1,1) PRIMARY KEY,
	CourtId INT NOT NULL,
	UserName VARCHAR(20) NOT NUll,
	BookingID INT NOT NULL,
	Rating INT 
	FOREIGN KEY (CourtId) REFERENCES Court(CourtId) ON DELETE CASCADE,
	FOREIGN KEY (UserName) REFERENCES Users(UserName) ON DELETE CASCADE,
	FOREIGN KEY (BookingID) REFERENCES CourtBooking(BookingID)
);