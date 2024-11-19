from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="your_username",
        password="your_password",
        database="temperature_db"
    )

@app.route('/temperatures')
def get_temperatures():
    try:
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        query = "SELECT timestamp, temperature FROM temperatures"
        params = []
        
        if start_date and end_date:
            query += " WHERE timestamp BETWEEN %s AND %s"
            params = [start_date, end_date]
            
        query += " ORDER BY timestamp ASC"
        
        cursor.execute(query, params)
        results = cursor.fetchall()
        
        return jsonify([{
            'timestamp': row['timestamp'].isoformat(),
            'temperature': float(row['temperature'])
        } for row in results])
        
    except Error as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Database error'}), 500
        
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)