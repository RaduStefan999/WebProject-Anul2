--CREATE TABLE

DROP SEQUENCE base_user_seq /* STATEMENT */;

DROP TABLE base_user CASCADE CONSTRAINTS /* STATEMENT */;


CREATE TABLE base_user
(
    id INT NOT NULL PRIMARY KEY,
    role VARCHAR2(10) NOT NULL,
    name VARCHAR2(40) NOT NULL,
    email VARCHAR2(40) NOT NULL,
    password VARCHAR2(30) NOT NULL
) /* STATEMENT */;

CREATE SEQUENCE base_user_seq START WITH 1 /* STATEMENT */;


--CREATE PACKEGE

CREATE OR REPLACE PACKAGE user_packege IS
    FUNCTION add_user ( user_role base_user.role%type, 
                        user_name base_user.name%type,
                        user_email base_user.email%type,
                        user_password base_user.password%type) RETURN INT;
END user_packege;


CREATE OR REPLACE PACKAGE BODY user_packege IS

    FUNCTION add_user ( user_role base_user.role%type, 
                        user_name base_user.name%type,
                        user_email base_user.email%type,
                        user_password base_user.password%type) RETURN INT AS
         
        CURSOR same_email_users IS SELECT email FROM base_user WHERE email = user_email;
        v_aux base_user.email%type;
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
        OPEN same_email_users;
        FETCH same_email_users INTO v_aux;      
        
        IF (same_email_users%NOTFOUND = FALSE)
        THEN
            raise_application_error(-20001, 'Already used email');
        END IF;
        
        INSERT INTO base_user (id, role, name, email, password) VALUES (base_user_seq.NEXTVAL, user_role, user_name, user_email, user_password); 
        COMMIT;
        
        RETURN 1;
    END add_user;                
    
END user_packege;