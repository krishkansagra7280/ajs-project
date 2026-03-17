/*
 * =========================================================
 *  Library Management System
 *  6th Semester Project – AngularJS SPA
 *  File: app.js
 * =========================================================
 */

// ---- MODULE ----
var app = angular.module('libraryApp', ['ngRoute']);

// ---- ROUTING ----
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/books', {
      templateUrl: 'views/books.html',
      controller: 'BooksCtrl'
    })
    .when('/members', {
      templateUrl: 'views/members.html',
      controller: 'MembersCtrl'
    })
    .when('/issue-return', {
      templateUrl: 'views/issue-return.html',
      controller: 'IssueReturnCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({ redirectTo: '/' });
});

// ---- SERVICE ----
app.service('LibraryService', function () {

  // Helper: today as YYYY-MM-DD string
  function todayStr() {
    var d = new Date();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  // Helper: date N days from now
  function futureDateStr(days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  // Helper: past date
  function pastDateStr(days) {
    var d = new Date();
    d.setDate(d.getDate() - days);
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  this.todayStr = function () { return todayStr(); };

  // ---- SEED DATA ----
  this.seedData = function () {
    if (localStorage.getItem('lms_seeded')) return;
    localStorage.removeItem('lms_books');
    localStorage.removeItem('lms_members');
    localStorage.removeItem('lms_transactions');

    var books = [
      { id: 2001, bookCode: 'B001', title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming', isbn: '978-0132350884', year: 2008, totalCopies: 3, availableCopies: 2 },
      { id: 2002, bookCode: 'B002', title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', isbn: '978-0062315007', year: 1988, totalCopies: 5, availableCopies: 4 },
      { id: 2003, bookCode: 'B003', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', genre: 'Computer Science', isbn: '978-0262033848', year: 2009, totalCopies: 2, availableCopies: 1 },
      { id: 2004, bookCode: 'B004', title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Science', isbn: '978-0553380163', year: 1988, totalCopies: 4, availableCopies: 3 },
      { id: 2005, bookCode: 'B005', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', isbn: '978-0061120084', year: 1960, totalCopies: 3, availableCopies: 2 },
      { id: 2006, bookCode: 'B006', title: 'Design Patterns', author: 'Gang of Four', genre: 'Programming', isbn: '978-0201633610', year: 1994, totalCopies: 2, availableCopies: 2 },
      { id: 2007, bookCode: 'B007', title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', isbn: '978-0062316097', year: 2011, totalCopies: 4, availableCopies: 3 },
      { id: 2008, bookCode: 'B008', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genre: 'Programming', isbn: '978-0135957059', year: 2019, totalCopies: 3, availableCopies: 1 }
    ];
    localStorage.setItem('lms_books', JSON.stringify(books));

    var members = [
      { id: 3001, memberId: 'M001', name: 'Ansh Sharma', email: 'ansh@college.edu', phone: '9876543210', membershipType: 'Premium', joinDate: '2025-08-15' },
      { id: 3002, memberId: 'M002', name: 'Priya Patel', email: 'priya@college.edu', phone: '9876543211', membershipType: 'Standard', joinDate: '2025-09-01' },
      { id: 3003, memberId: 'M003', name: 'Rohan Mehta', email: 'rohan@college.edu', phone: '9876543212', membershipType: 'Premium', joinDate: '2025-07-20' },
      { id: 3004, memberId: 'M004', name: 'Sneha Joshi', email: 'sneha@college.edu', phone: '9876543213', membershipType: 'Standard', joinDate: '2025-10-05' },
      { id: 3005, memberId: 'M005', name: 'Arjun Verma', email: 'arjun@college.edu', phone: '9876543214', membershipType: 'Premium', joinDate: '2025-06-12' }
    ];
    localStorage.setItem('lms_members', JSON.stringify(members));

    var transactions = [
      { id: 5001, memberId: 3001, bookId: 2001, memberName: 'Ansh Sharma', bookTitle: 'Clean Code', issueDate: pastDateStr(10), dueDate: pastDateStr(-4), returnDate: null, status: 'issued' },
      { id: 5002, memberId: 3002, bookId: 2003, memberName: 'Priya Patel', bookTitle: 'Introduction to Algorithms', issueDate: pastDateStr(5), dueDate: futureDateStr(9), returnDate: null, status: 'issued' },
      { id: 5003, memberId: 3003, bookId: 2005, memberName: 'Rohan Mehta', bookTitle: 'To Kill a Mockingbird', issueDate: pastDateStr(15), dueDate: pastDateStr(1), returnDate: pastDateStr(2), status: 'returned' },
      { id: 5004, memberId: 3005, bookId: 2008, memberName: 'Arjun Verma', bookTitle: 'The Pragmatic Programmer', issueDate: pastDateStr(8), dueDate: futureDateStr(6), returnDate: null, status: 'issued' },
      { id: 5005, memberId: 3004, bookId: 2007, memberName: 'Sneha Joshi', bookTitle: 'Sapiens', issueDate: pastDateStr(20), dueDate: pastDateStr(6), returnDate: pastDateStr(7), status: 'returned' }
    ];
    localStorage.setItem('lms_transactions', JSON.stringify(transactions));
    localStorage.setItem('lms_seeded', '1');
  };

  // ---- BOOKS ----
  this.getBooks = function () {
    var data = localStorage.getItem('lms_books');
    return data ? JSON.parse(data) : [];
  };

  this.saveBooks = function (books) {
    localStorage.setItem('lms_books', JSON.stringify(books));
  };

  this.addBook = function (book) {
    var books = this.getBooks();
    book.id = Date.now();
    var maxNum = 0;
    books.forEach(function (b) {
      var n = parseInt((b.bookCode || '').replace(/\D/g, ''), 10);
      if (!isNaN(n) && n > maxNum) maxNum = n;
    });
    book.bookCode = 'B' + String(maxNum + 1).padStart(3, '0');
    book.availableCopies = book.totalCopies;
    books.push(book);
    this.saveBooks(books);
    return book;
  };

  this.updateBook = function (updated) {
    var books = this.getBooks();
    for (var i = 0; i < books.length; i++) {
      if (books[i].id === updated.id) {
        books[i] = updated;
        break;
      }
    }
    this.saveBooks(books);
  };

  this.deleteBook = function (id) {
    var books = this.getBooks().filter(function (b) { return b.id !== id; });
    this.saveBooks(books);
  };

  this.getBookById = function (id) {
    var books = this.getBooks();
    for (var i = 0; i < books.length; i++) {
      if (books[i].id === id) return books[i];
    }
    return null;
  };

  // ---- MEMBERS ----
  this.getMembers = function () {
    var data = localStorage.getItem('lms_members');
    return data ? JSON.parse(data) : [];
  };

  this.saveMembers = function (members) {
    localStorage.setItem('lms_members', JSON.stringify(members));
  };

  this.addMember = function (member) {
    var members = this.getMembers();
    member.id = Date.now();
    var maxNum = 0;
    members.forEach(function (m) {
      var n = parseInt((m.memberId || '').replace(/\D/g, ''), 10);
      if (!isNaN(n) && n > maxNum) maxNum = n;
    });
    member.memberId = 'M' + String(maxNum + 1).padStart(3, '0');
    member.joinDate = todayStr();
    members.push(member);
    this.saveMembers(members);
    return member;
  };

  this.updateMember = function (updated) {
    var members = this.getMembers();
    for (var i = 0; i < members.length; i++) {
      if (members[i].id === updated.id) {
        members[i] = updated;
        break;
      }
    }
    this.saveMembers(members);
  };

  this.deleteMember = function (id) {
    var members = this.getMembers().filter(function (m) { return m.id !== id; });
    this.saveMembers(members);
  };

  // ---- TRANSACTIONS ----
  this.getTransactions = function () {
    var data = localStorage.getItem('lms_transactions');
    return data ? JSON.parse(data) : [];
  };

  this.saveTransactions = function (transactions) {
    localStorage.setItem('lms_transactions', JSON.stringify(transactions));
  };

  this.issueBook = function (memberId, bookId) {
    var members = this.getMembers();
    var books = this.getBooks();
    var member = null, book = null;
    for (var i = 0; i < members.length; i++) { if (members[i].id === memberId) { member = members[i]; break; } }
    for (var j = 0; j < books.length; j++) { if (books[j].id === bookId) { book = books[j]; break; } }
    if (!member || !book) return { success: false, msg: 'Invalid member or book selection.' };
    if (book.availableCopies <= 0) return { success: false, msg: 'No copies available for this book.' };

    // Check if member already has this book
    var txns = this.getTransactions();
    for (var k = 0; k < txns.length; k++) {
      if (txns[k].memberId === memberId && txns[k].bookId === bookId && txns[k].status === 'issued') {
        return { success: false, msg: 'This member already has this book issued.' };
      }
    }

    var txn = {
      id: Date.now(),
      memberId: memberId,
      bookId: bookId,
      memberName: member.name,
      bookTitle: book.title,
      issueDate: todayStr(),
      dueDate: futureDateStr(14),
      returnDate: null,
      status: 'issued'
    };
    txns.push(txn);
    this.saveTransactions(txns);

    // Decrease available copies
    book.availableCopies--;
    this.updateBook(book);

    return { success: true, msg: 'Book issued to ' + member.name + '! Due: ' + txn.dueDate };
  };

  this.returnBook = function (transactionId) {
    var txns = this.getTransactions();
    for (var i = 0; i < txns.length; i++) {
      if (txns[i].id === transactionId && txns[i].status === 'issued') {
        txns[i].status = 'returned';
        txns[i].returnDate = todayStr();
        this.saveTransactions(txns);

        // Increase available copies
        var book = this.getBookById(txns[i].bookId);
        if (book) {
          book.availableCopies++;
          this.updateBook(book);
        }
        return { success: true, msg: '"' + txns[i].bookTitle + '" returned by ' + txns[i].memberName + '.' };
      }
    }
    return { success: false, msg: 'Transaction not found.' };
  };

  this.getActiveIssues = function () {
    return this.getTransactions().filter(function (t) { return t.status === 'issued'; });
  };

  this.getOverdueCount = function () {
    var today = todayStr();
    return this.getTransactions().filter(function (t) {
      return t.status === 'issued' && t.dueDate < today;
    }).length;
  };

  // Run seed on service construction
  this.seedData();
});

// ---- CUSTOM FILTER ----
app.filter('bookSearch', function () {
  return function (books, query) {
    if (!query) return books;
    query = query.toLowerCase();
    return books.filter(function (b) {
      return (b.title && b.title.toLowerCase().indexOf(query) >= 0) ||
        (b.author && b.author.toLowerCase().indexOf(query) >= 0) ||
        (b.bookCode && b.bookCode.toLowerCase().indexOf(query) >= 0) ||
        (b.genre && b.genre.toLowerCase().indexOf(query) >= 0) ||
        (b.isbn && b.isbn.toLowerCase().indexOf(query) >= 0);
    });
  };
});

app.filter('memberSearch', function () {
  return function (members, query) {
    if (!query) return members;
    query = query.toLowerCase();
    return members.filter(function (m) {
      return (m.name && m.name.toLowerCase().indexOf(query) >= 0) ||
        (m.memberId && m.memberId.toLowerCase().indexOf(query) >= 0) ||
        (m.email && m.email.toLowerCase().indexOf(query) >= 0) ||
        (m.membershipType && m.membershipType.toLowerCase().indexOf(query) >= 0);
    });
  };
});

// ---- DASHBOARD CONTROLLER ----
app.controller('DashboardCtrl', function ($scope, LibraryService) {
  $scope.stats = {
    totalBooks: LibraryService.getBooks().length,
    totalMembers: LibraryService.getMembers().length,
    activeIssues: LibraryService.getActiveIssues().length,
    overdue: LibraryService.getOverdueCount()
  };

  $scope.recentTransactions = LibraryService.getTransactions().slice(-5).reverse();
  $scope.today = LibraryService.todayStr();

  $scope.isOverdue = function (txn) {
    return txn.status === 'issued' && txn.dueDate < $scope.today;
  };
});

// ---- BOOKS CONTROLLER ----
app.controller('BooksCtrl', function ($scope, LibraryService) {
  $scope.books = LibraryService.getBooks();
  $scope.searchQuery = '';
  $scope.showModal = false;
  $scope.editMode = false;

  $scope.genres = ['Fiction', 'Non-Fiction', 'Programming', 'Computer Science', 'Science', 'History', 'Biography', 'Self-Help', 'Philosophy', 'Other'];

  $scope.openAddModal = function () {
    $scope.formBook = { title: '', author: '', genre: '', isbn: '', year: '', totalCopies: 1 };
    $scope.editMode = false;
    $scope.showModal = true;
    $scope.formError = '';
  };

  $scope.openEditModal = function (book) {
    $scope.formBook = angular.copy(book);
    $scope.editMode = true;
    $scope.showModal = true;
    $scope.formError = '';
  };

  $scope.closeModal = function () {
    $scope.showModal = false;
  };

  $scope.validateForm = function (b) {
    if (!b.title || b.title.trim() === '') return 'Book title is required.';
    if (!b.author || b.author.trim() === '') return 'Author name is required.';
    if (!b.genre) return 'Please select a genre.';
    if (!b.totalCopies || b.totalCopies < 1) return 'At least 1 copy is required.';
    return '';
  };

  $scope.saveBook = function () {
    var err = $scope.validateForm($scope.formBook);
    if (err) { $scope.formError = err; return; }

    if ($scope.editMode) {
      LibraryService.updateBook($scope.formBook);
    } else {
      LibraryService.addBook($scope.formBook);
    }
    $scope.books = LibraryService.getBooks();
    $scope.closeModal();
  };

  $scope.deleteBook = function (id) {
    if (window.confirm('Are you sure you want to delete this book?')) {
      LibraryService.deleteBook(id);
      $scope.books = LibraryService.getBooks();
    }
  };
});

// ---- MEMBERS CONTROLLER ----
app.controller('MembersCtrl', function ($scope, LibraryService) {
  $scope.members = LibraryService.getMembers();
  $scope.searchQuery = '';
  $scope.showModal = false;
  $scope.editMode = false;

  $scope.openAddModal = function () {
    $scope.formMember = { name: '', email: '', phone: '', membershipType: 'Standard' };
    $scope.editMode = false;
    $scope.showModal = true;
    $scope.formError = '';
  };

  $scope.openEditModal = function (member) {
    $scope.formMember = angular.copy(member);
    $scope.editMode = true;
    $scope.showModal = true;
    $scope.formError = '';
  };

  $scope.closeModal = function () {
    $scope.showModal = false;
  };

  $scope.validateForm = function (m) {
    if (!m.name || m.name.trim() === '') return 'Member name is required.';
    if (m.email && !/\S+@\S+\.\S+/.test(m.email)) return 'Enter a valid email.';
    return '';
  };

  $scope.saveMember = function () {
    var err = $scope.validateForm($scope.formMember);
    if (err) { $scope.formError = err; return; }

    if ($scope.editMode) {
      LibraryService.updateMember($scope.formMember);
    } else {
      LibraryService.addMember($scope.formMember);
    }
    $scope.members = LibraryService.getMembers();
    $scope.closeModal();
  };

  $scope.deleteMember = function (id) {
    if (window.confirm('Are you sure you want to delete this member?')) {
      LibraryService.deleteMember(id);
      $scope.members = LibraryService.getMembers();
    }
  };
});

// ---- ISSUE/RETURN CONTROLLER ----
app.controller('IssueReturnCtrl', function ($scope, LibraryService) {
  $scope.members = LibraryService.getMembers();
  $scope.books = LibraryService.getBooks();
  $scope.selectedMemberId = '';
  $scope.selectedBookId = '';
  $scope.issueMsg = '';
  $scope.issueMsgType = '';
  $scope.returnMsg = '';
  $scope.returnMsgType = '';
  $scope.today = LibraryService.todayStr();

  $scope.availableBooks = LibraryService.getBooks().filter(function (b) { return b.availableCopies > 0; });

  $scope.issueBook = function () {
    if (!$scope.selectedMemberId || !$scope.selectedBookId) {
      $scope.issueMsg = 'Please select both a member and a book.';
      $scope.issueMsgType = 'danger';
      return;
    }
    var result = LibraryService.issueBook(parseInt($scope.selectedMemberId), parseInt($scope.selectedBookId));
    $scope.issueMsg = result.msg;
    $scope.issueMsgType = result.success ? 'success' : 'danger';
    if (result.success) {
      $scope.selectedMemberId = '';
      $scope.selectedBookId = '';
      $scope.refreshData();
    }
  };

  $scope.returnBook = function (txnId) {
    var result = LibraryService.returnBook(txnId);
    $scope.returnMsg = result.msg;
    $scope.returnMsgType = result.success ? 'success' : 'danger';
    $scope.refreshData();
  };

  $scope.refreshData = function () {
    $scope.activeIssues = LibraryService.getActiveIssues();
    $scope.books = LibraryService.getBooks();
    $scope.availableBooks = $scope.books.filter(function (b) { return b.availableCopies > 0; });
  };

  $scope.isOverdue = function (txn) {
    return txn.status === 'issued' && txn.dueDate < $scope.today;
  };

  // Initialize
  $scope.activeIssues = LibraryService.getActiveIssues();
});

// ---- ABOUT CONTROLLER ----
app.controller('AboutCtrl', function ($scope) {
  $scope.projectInfo = {
    title: 'Library Management System',
    subject: 'Advanced JavaScript (AngularJS)',
    semester: '6th Semester',
    year: '2025-26',
    student: 'Ansh',
    college: 'Your College Name',
    guide: 'Prof. [Guide Name]',
    techs: ['AngularJS 1.8', 'HTML5', 'CSS3', 'JavaScript ES5', 'ngRoute', 'localStorage API']
  };
});
