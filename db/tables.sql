CREATE TABLE [dbo].[SimpleEntry](
	[Id] [int] IDENTITY(123001,1) NOT NULL,
	[Guid] [uniqueidentifier] NOT NULL,
	[EntryKey] [varchar](50) NOT NULL,
	[IsPermitted] [bit] NOT NULL,
	[Json] [nvarchar](max) NOT NULL,
	[UserId] [int] NOT NULL,
	[CreatedIp] [varchar](15) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NULL,
	[Deleted] [bit] NOT NULL,
	[DeletedDate] [datetime2](7) NULL,
 CONSTRAINT [PK_SimpleEntry] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
) ON [PRIMARY]

ALTER TABLE [dbo].[SimpleEntry] ADD  CONSTRAINT [DF_SimpleEntry_Guid]  DEFAULT (newid()) FOR [Guid]
GO
ALTER TABLE [dbo].[SimpleEntry] ADD  CONSTRAINT [DF_SimpleEntry_IsPermitted]  DEFAULT ((0)) FOR [IsPermitted]
GO
ALTER TABLE [dbo].[SimpleEntry] ADD  CONSTRAINT [DF_SimpleEntry_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[SimpleEntry] ADD  CONSTRAINT [DF_SimpleEntry_Deleted]  DEFAULT ((0)) FOR [Deleted]
GO

INSERT INTO SimpleEntry ([EntryKey], [Json], [UserId], [CreatedIp])
values ('dot', 'Sample: Dot', 1, '')
INSERT INTO SimpleEntry ([EntryKey], [Json], [UserId], [CreatedIp])
values ('line', '{"id":"101","Name":"Sample: Name","Text":"Sample: Text","Value":"Sample: Value"}', 1, '')

INSERT INTO SimpleEntry ([EntryKey], [Json], [UserId], [CreatedIp])
values ('plane', '[{"id":"101","Name":"Sample: Name","Text":"Sample: Text","Value":"Sample: Value"},
{"id":"102","Name":"Sample: Name 2","Text":"Sample: Text 2","Value":"Sample: Value 2"}]', 1, '')

INSERT INTO SimpleEntry ([EntryKey], [Json], [UserId], [CreatedIp])
values ('book', '{"title":"Henry Potter","author":"Emily"
,"chapters":[{"index":"1","title":"School at Dawn"
, "sections":[{"index": "A", "title": "AM"}, {"index": "B", "title": "PM"}]}
,{"index":"2","title":"Morning Magic"
, "sections":[{"index": "A", "title": "Penguin Magic"}, {"index": "B", "title": "Monkey Magic"}, {"index": "C", "title": "Duck Magic"}]}]
}', 1, '')

INSERT INTO SimpleEntry ([EntryKey], [Json], [UserId], [CreatedIp])
values ('banks', '[{"name": "Bank of America", "branches": [{"location": "Boston, MA", "countOfEmployees": "55", "departments": [{"name": "Marketing", "phone": "301-123-1234"}, {"name": "Customer Service", "phone": "301-123-5678"}]}, {"location": "New York City, NY", "countOfEmployees": "66"}]}
, {"name": "HSBC", "branches": [{"location": "Washington D.C.", "countOfEmployees": "77"}, {"location": "Philadephia, PA", "countOfEmployees": "88"}]}
, {"name": "Capital One", "branches": [{"location": "Sacramento, CA", "countOfEmployees": "99"}, {"location": "Dallas, TX", "countOfEmployees": "22"}]}]', 1, '')

INSERT INTO SimpleEntry ([EntryKey], [Json], [UserId], [CreatedIp])
values ('items', '[{"id": 11, "name": "Pencil", "quantity": "15"}, {"id": 12, "name": "Crayon", "quantity": "20"}]', 1, '')

INSERT INTO SimpleEntry ([EntryKey], [Json], [IsPermitted], [UserId], [CreatedIp])
values ('account', '{"name": "Scott"}', 1, 1, '')

INSERT INTO SimpleEntry ([EntryKey], [Json], [IsPermitted], [UserId], [CreatedIp])
values ('orders', '[{"orderId":"1001", "orderDate":"1/2/2015", "orderAmount":"$15"},
{"orderId":"1002", "orderDate":"1/5/2015", "orderAmount":"$39"},
{"orderId":"1003", "orderDate":"2/15/2015", "orderAmount":"$25"}]', 1, 1, '')





