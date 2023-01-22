<?php

// Check Session and get user_id (22IIPE00018)
$user_id = "22IIPE00018";

// Import Database Connection
require_once '../config/database.php';

try {
    $select = "SELECT * FROM faculty_academic_experience WHERE user_id = ?";
    $select_stmt = mysqli_prepare($conn, $select);
    mysqli_stmt_bind_param($select_stmt, 's', $user_id);
    if (!mysqli_stmt_execute($select_stmt)) throw new Exception('Unable to fetch records');
    $result = mysqli_stmt_get_result($select_stmt);
    
    $records = array();
    
    while ($row = mysqli_fetch_assoc($result)) {
        $records[] = array(
            'organisation' => $row['organisation'],
            'designation' => $row['designation'],
            'type_of_organisation' => $row['type_of_organisation'],
            'from' => $row['start_date'],
            'to' => $row['end_date']
        );
    }
    
    echo json_encode(array(
        'status' => 'success',
        'msg' => 'Data fetched successfully',
        'data' => $records,
    ));
} catch (Exception $e) {
    echo json_encode(array(
        'status' => 'error',
        'msg' => $e->getMessage()
    ));
}