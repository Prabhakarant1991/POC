USE [TEST]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 17/01/2024 5:31:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[PhoneNumber] [varchar](10) NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[City] [varchar](30) NOT NULL,
	[State] [varchar](30) NOT NULL,
	[Country] [varchar](30) NOT NULL,
	[PostalCode] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[AddNewContact]    Script Date: 17/01/2024 5:31:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[AddNewContact]
@FirstName varchar(50),
@LastName varchar(50),
@Email varchar(50),
@PhoneNumber varchar(10),
@Address varchar(50),
@City varchar(30),
@State varchar(30),
@Country varchar(30),
@PostalCode varchar(6)
 
AS
BEGIN
	INSERT INTO dbo.Contacts(FirstName,LastName,Email,PhoneNumber,Address,City,State,Country,PostalCode)
	VALUES(@FirstName,@LastName,@Email,@PhoneNumber,@Address,@City,@State,@Country,@PostalCode	)
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteContactByID]    Script Date: 17/01/2024 5:31:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [dbo].[DeleteContactByID]
@Id int
AS
BEGIN
	DELETE FROM dbo.Contacts where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[GetContactByID]    Script Date: 17/01/2024 5:31:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[GetContactByID]
@Id int
AS
BEGIN
	SELECT Id,FirstName,LastName,Email,PhoneNumber,Address,City,State,Country,PostalCode
	FROM dbo.Contacts with (NOLOCK) where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[GetContactsList]    Script Date: 17/01/2024 5:31:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[GetContactsList]
AS
BEGIN
	SELECT Id,FirstName,LastName,Email,PhoneNumber,Address,City,State,Country,PostalCode FROM dbo.Contacts with (NOLOCK)
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateContact]    Script Date: 17/01/2024 5:31:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [dbo].[UpdateContact]
@Id int,
@FirstName varchar(50),
@LastName varchar(50),
@Email varchar(50),
@PhoneNumber varchar(10),
@Address varchar(50),
@City varchar(30),
@State varchar(30),
@Country varchar(30),
@PostalCode varchar(6)
AS
BEGIN
	UPDATE dbo.Contacts
    SET
		FirstName = @FirstName,
		LastName = @LastName,
		Email = @Email,
		PhoneNumber = @PhoneNumber,
		Address = @Address,
		City = @City,
		State = @State,
		Country =@Country,
		PostalCode =@PostalCode
	WHERE Id = @Id
END
GO
