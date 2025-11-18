# Admin Suite Quick Start Guide

## Accessing the Admin Portal

### For Super Admins, Org Admins, and Teachers

1. **Log in** with your admin credentials
2. The system will automatically detect your role and redirect you to the admin portal
3. You'll see the **Admin Dashboard** with analytics overview

## Navigation

The admin portal has 4 main sections accessible from the top navigation:

### 1. Dashboard (Home)

- Quick stats: Active students, study time, test-ready count, GED passes
- GED readiness charts by subject
- Quick links to other admin sections

### 2. Classes

- View all classes in a card grid
- Create new classes with name, label, dates
- Edit existing classes
- Manage class rosters (add/remove students)
- Export class rosters as CSV with scores
- Filter by active/inactive status
- Search classes by name

### 3. Students

- Search students by name, email, phone
- Filter by class, active status
- View student table with pagination
- Create new students with:
  - Basic info (name, email, phone)
  - Class assignment
  - Course enrollment flags
  - Temporary password generation
- Edit student profiles
- View highest practice scores
- Export students as CSV

### 4. Reports

Three report tabs:

- **GED Readiness** - Subject-by-subject breakdown (Ready/Almost Ready/Needs Study)
- **Student Activity** - Active students and study time over 30/60/90 days
- **Official GED Results** - Pass rates and scores from actual GED tests

## Role-Based Access

### Super Admins

- See data from **all organizations**
- Can create/edit/delete across all orgs
- Full platform-wide access

### Org Admins

- See data from **their organization only**
- Can manage classes and students in their org
- Cannot see other organizations' data

### Teachers

- See data from **their organization**
- Can view and manage students/classes
- Same access as org admins (future: can be limited to specific classes)

## Key Features

### Classes Management

- **Create:** Click "Create Class" button → fill form → save
- **Edit:** Click edit icon on class card → modify → save
- **Roster:** Click "Roster" button → drag students between "Available" and "In Class" → done
- **Export:** Click download icon to get CSV with student scores and readiness bands
- **Delete:** Click trash icon → confirm (soft delete, can be recovered)

### Student Management

- **Search:** Use filters at top → click "Search" button
- **Create:** Click "Add Student" → fill form → choose password mode → save
- **Edit:** Click "Edit" on student row → modify in drawer → save
- **Export:** Click "Export CSV" to download filtered list
- **Pagination:** Use Previous/Next buttons for large lists

### Reports & Analytics

- **Filter by class:** Use dropdown to focus on specific class
- **Switch tabs:** Click tab headers to switch between Readiness/Activity/GED Results
- **Visual charts:** Progress bars show distribution by readiness level
- **Time periods:** Activity and GED results show multiple time windows

## Common Tasks

### Add a New Class

1. Go to **Classes** tab
2. Click **Create Class**
3. Enter class name (required)
4. Optionally add label, start/end dates
5. Check "Active Class"
6. Click **Create Class**

### Enroll Students in a Class

1. Go to **Classes** tab
2. Click **Roster** on the class card
3. Search for students in "Available Students" column
4. Click **+** icon to add student to class
5. Click **-** icon to remove student from class
6. Click **Done**

### Create a New Student

1. Go to **Students** tab
2. Click **Add Student**
3. Fill in first name, last name, email (required)
4. Optionally add phone, assign to class, set test date
5. Select course enrollment flags (which GED subjects they're studying)
6. Choose password mode:
   - **Temp Password:** System generates password (you'll see it after creation)
   - **Invite Email:** Send invite (feature pending)
7. Click **Create Student**
8. If temp password: Copy and share with student

### View Student Performance

1. Go to **Reports** tab
2. Select **GED Readiness** tab
3. View breakdown by subject:
   - **Green (Ready 145+):** Student can take GED test
   - **Yellow (Almost Ready 135-144):** Needs a bit more study
   - **Red (Needs Study <135):** More practice recommended
4. Use class filter to focus on specific class

### Export Data

**Class Roster:**

1. Go to Classes → Click download icon on class card
2. CSV includes: student names, emails, scores, readiness bands

**Student List:**

1. Go to Students → Apply filters → Click "Export CSV"
2. CSV includes: names, emails, phones, classes, test dates, login times

## Tips & Best Practices

1. **Use Labels:** Add labels to classes (e.g., "Advanced", "Beginner", "ESL") for easier organization
2. **Regular Exports:** Export data regularly for record-keeping
3. **Monitor Readiness:** Check GED Readiness report weekly to identify students ready for testing
4. **Track Activity:** Use Activity report to identify disengaged students
5. **Set Test Dates:** Add test dates to student profiles to track preparation timelines
6. **Course Flags:** Always set course flags to indicate which GED subjects each student is studying
7. **Class Dates:** Use start/end dates to track class sessions/semesters

## Keyboard Shortcuts

- **Esc:** Close modals and drawers
- **Enter:** Submit forms (when in text input)
- **Tab:** Navigate between form fields

## Support & Troubleshooting

### Data Not Loading

- Check internet connection
- Try clicking "Refresh" buttons
- Log out and log back in

### Can't See Other Organizations (Org Admins)

- This is expected - org admins only see their own organization
- Contact super admin if you need cross-org access

### Student Not Appearing in Roster

- Check if student is active (Profiles table)
- Verify student is in same organization as class
- Try refreshing the roster view

### CSV Export Issues

- Ensure pop-up blocker is disabled
- Try different browser if download fails
- Check browser downloads folder

---

**Need Help?** Contact your system administrator or super admin.
