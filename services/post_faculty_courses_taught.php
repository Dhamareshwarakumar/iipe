<?php

// Check Session and get user_id(22IIPE00018)
$user_id = "22IIPE00018";

// Import Database Connection
require_once '../config/database.php';

// Get the data from the request
$data = file_get_contents('php://input');
$data = json_decode($data);

// TODO: Validate the data

try {
    // Start Transaction
    if (!mysqli_begin_transaction($conn)) throw new Exception('Unable to start transaction');

    // Delete all the existing records
    $delete_query = "DELETE FROM faculty_courses_taught WHERE user_id = ?";
    $delete_stmt = mysqli_prepare($conn, $delete_query);
    mysqli_stmt_bind_param($delete_stmt, 's', $user_id);
    if (!mysqli_stmt_execute($delete_stmt)) throw new Exception('Unable to delete existing records');

    // Insert the new records
    $insert_query = "INSERT INTO faculty_courses_taught (user_id, course_code, title, level, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)";
    $insert_stmt = mysqli_prepare($conn, $insert_query);
    foreach ($data as $record) {
        mysqli_stmt_bind_param($insert_stmt, 'ssssss', $user_id, $record->course_code, $record->title, $record->level, $record->from, $record->to);
        if (!mysqli_stmt_execute($insert_stmt)) throw new Exception('Unable to insert new records');
    }

    // Commit the transaction
    mysqli_commit($conn);

    // Return success
    echo json_encode(array(
        'status' => 'success',
        'msg' => 'Data saved successfully'
    ));
} catch (Exception $e) {
    mysqli_rollback($conn);
    echo json_encode(array(
        'status' => 'error',
        'msg' => $e->getMessage()
    ));
}